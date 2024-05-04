const mysql = require('mysql')
const config = require('./config.json')
const express = require('express');
const router = express.Router();

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
});
// connection.connect((err) => err && console.log(err));
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err);
    return;
  }
  console.log('Database connection successful!');
});

// Bella: Route to get general information on a Business that has been clicked on including reviews.
//AKA what shows up when a user clicks on a business or searches for a business
const business = async function(req, res) {
  console.log("Accessing business details for ID:", req.params.business_id);
  const business_id = req.params.business_id;

  const businessQuery = `
    SELECT name, address, city, postal_code, stars, review_count, hours, attributes
    FROM Business
    WHERE business_id = ?;
  `;
  const reviewsQuery = `
    SELECT r.date, COALESCE(NULLIF(u.name, ''), 'Anonymous') AS name, r.text, r.stars, u.review_count
    FROM Review r
    JOIN User u ON r.user_id = u.user_id
    WHERE r.business_id = ?
    ORDER BY r.date DESC
    LIMIT 5;
  `;

  connection.query(businessQuery, [business_id], (err, businessData) => {
    if (err || businessData.length === 0) {
      console.error('Error fetching business data:', err);
      res.json({ error: "Business not found or database error" });
      return;
    }

    console.log('Business data:', businessData[0]);  // Log business data

    connection.query(reviewsQuery, [business_id], (err, reviewsData) => {
      if (err) {
        console.error('Error fetching reviews data:', err);
        businessData[0].reviews = { error: "Error fetching reviews" };
        res.json(businessData[0]);
        return;
      }

      console.log('Reviews data:', reviewsData);  // Log reviews data

      const result = {
        ...businessData[0],
        reviews: reviewsData.length > 0 ? reviewsData : 'No reviews found'
      };
      res.json(result);
    });
  });
};


//Bella: Route to get reviews from a business
//At this point, the user has already selected a business and has now clicked the reviews button to look at the reviews
const business_reviews = async function(req, res) {
  const business_id = req.params.business_id;
  const business_reviews_query = `
    SELECT r.date, COALESCE(NULLIF(u.name, ''), 'Anonymous') AS name, r.text, r.stars, u.review_count
    FROM Review r JOIN User u ON r.user_id=u.user_id
    WHERE business_id = ?
    ORDER BY date DESC
  `;
  console.log(`Fetching reviews for business ID: ${business_id}`);
  connection.query(business_reviews_query, [business_id], (err, data) => {
    if(err) { 
      console.log(err);
      res.json({ error: "Error fetching reviews" });
      return;
    }
    if (data.length === 0) { //some businesses may have no reviews
      res.json({error: 'No reviews found for this business'});
      return;
    }
    
    // Prepare the results to send back
    const reviews = data.map(row => ({
      date: row.date,
      name: row.name,
      text: row.text,
      stars: row.stars,
      review_count: row.review_count
    }));

    res.json(reviews);
  });
}


//Bella: Rotue to get tips for a business
//At this point, the user has already selected a business and has now clicked the tips button to look at the tips
const business_tips = async function(req, res) {
  const business_id = req.params.business_id;
  const business_tips_query = `
    SELECT t.date, t.text, u.name, u.review_count
    FROM Tip t JOIN User u ON t.user_id=u.user_id
    WHERE business_id = ?
    ORDER BY date DESC
  `;
  console.log(`Fetching tips for business ID: ${business_id}`);
  connection.query(business_tips_query, [business_id], (err, data) => {
    if(err) {
      console.log(err);
      res.json({});
    }
    else if (data.length === 0) {
      res.json({error: 'No tips found for this business'});
    }
    else {
      res.json(data);
    }
  })
}
//top businesses by tips (Query 9)
const top_business_tips = async function(req, res) {
  const category = req.params.category;
  const top_business_by_tips_query =`
    SELECT b.name, b.address, b.stars, t.text AS tip_text, t.compliment_count
    FROM Business b
    JOIN Tip t ON b.business_id = t.business_id
    WHERE b.categories LIKE CONCAT('%', ?, '%') 
    ORDER BY t.compliment_count DESC, b.stars DESC
    LIMIT 10;
  `;
  console.log(`Fetching top businesses for category: ${category}`);
  connection.query(top_business_by_tips_query, [category], (err, data) => {
    if(err) {
      console.log(err);
      res.json({});
    }
    else if (data.length === 0){
      res.json({error: 'No businesses found for this category'});
    }
    else{
      res.json(data);
    }
  })
}

//Jack's query 1
const active_users = async function(req, res) {
  const limit = parseInt(req.query.limit, 10) || 10;

  const active_users_query = `
      SELECT *
      FROM User u
      ORDER BY u.review_count DESC
      LIMIT ?;
  `;

  console.log("Fetching most active users with limit:", limit);

  connection.query(active_users_query, [limit], (err, data) => {
      if(err) {
          console.log("Error fetching active users:", err);
          res.status(500).json({ error: "Error fetching active users" });
          return;
      }
      res.json(data);
  });
};

const getUserDetails = async function(req, res) {
  const { user_id } = req.params;

  const userDetailsQuery = `
      SELECT *
      FROM User u
      WHERE u.user_id = ?;
  `;

  console.log("Fetching details for user:", user_id);

  connection.query(userDetailsQuery, [user_id], (err, data) => {
      if(err) {
          console.log("Error fetching user details:", err);
          res.status(500).json({ error: "Error fetching user details", details: err.message });
          return;
      }
      if (data.length === 0) {
          res.status(404).json({ error: "User not found" });
          return;
      }
      res.json(data[0]);
  });
};


const search_category = async function(req, res) {
  const { city, category, zipCode, stars, rev_count, numTips } = req.query;
  let categories_query = `SELECT name, address, city, postal_code, stars, review_count, hours, attributes, total_tips 
  FROM Business b LEFT JOIN business_tip_count t ON b.business_id = t.business_id 
  WHERE`;
  if (city) {
    categories_query += ` city = '${city}'`;
  } 
  else if (zipCode) {
    categories_query += ` postal_code = ${zipCode}`;
  }
  if (category) {
    categories_query += ` AND categories LIKE '%${category}%'`;
  } 
  if (stars) {
    categories_query += ` AND stars between ${stars}.0 AND ${stars}.9`;
  }
  if (rev_count) {
    categories_query += ` AND review_count <= ${rev_count}`;
  }
  if (numTips) {
    categories_query += ` AND total_tips >= ${numTips}`;
  }

  console.log(`Executing search query: ${categories_query}`);
  
  connection.query(categories_query, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while searching for businesses.' });
      return;
    }
    
    if (data.length === 0) {
      res.status(404).json({ error: 'No businesses found matching the search criteria' });
      return;
    }

    res.json(data);
  });
}

const validateFriends = async function(req, res) {
  const { friends } = req.body;  // Array of friend IDs from the request body

  if (!friends || !Array.isArray(friends)) {
    return res.status(400).json({ error: "Invalid input: Expected an array of friend IDs" });
  }

  const friendsQuery = `
    SELECT user_id
    FROM User
    WHERE user_id IN (?);
  `;

  // We need to ensure that the array of friends is formatted correctly for the SQL IN clause
  const formattedFriends = friends.map(id => id.trim());

  console.log("Validating friend IDs:", formattedFriends);

  connection.query(friendsQuery, [formattedFriends], (err, data) => {
    if (err) {
      console.log("Error validating friend IDs:", err);
      return res.status(500).json({ error: "Error validating friend IDs", details: err.message });
    }

    // Extract valid user IDs from the data returned by the query
    const validFriends = data.map(row => row.user_id);
    
    res.json({ validFriends });
  });
};


module.exports = {
  business,
  business_reviews,
  business_tips,
  top_business_tips,
  search_category,
  active_users,
  getUserDetails,
  validateFriends
}
