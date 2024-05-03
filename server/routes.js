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



module.exports = {
  business,
  business_reviews,
  business_tips
}
