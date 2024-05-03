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
  console.log(`Received request for business ID: ${business_id}`);
  const business_query = `
    SELECT name, address, city, postal_code, stars, review_count, hours, attributes
    FROM Business
    WHERE business_id = ?
  `;
  connection.query(business_query, [business_id], (err, data) => {
    if(err || data.length === 0) {
      console.log(err);
      res.json({});
    }
    else {
      console.log('Data retrieved from the database: ', data[0]);
      result = data[0];
      result.name = result.name || 'No name provided';
      result.address = result.address || 'No address provided';
      result.city = result.city || 'No city provided';
      result.postal_code = result.postal_code || 'No postal code provided';
      result.stars = result.stars || 'Number of stars not available for this business';
      result.review_count = result.review_count || 'No reviews';
      result.hours = result.hours || 'Hours of operation not available';
      result.attributes = result.attributes || 'Business attributes not available';
      res.json(result);
    }
  });
}

//Bella: Route to get reviews from a business
//At this point, the user has already selected a business and has now clicked the reviews button to look at the reviews
const business_reviews = async function(req, res) {
  const business_id = req.params.business_id;
  const business_reviews_query = `
    SELECT r.date, COALESCE(NULLIF(u.name, ''), 'Anonymous') AS name, r.text, r.stars
    FROM Review r JOIN User u ON r.user_id=u.user_id
    WHERE business_id = ?
    ORDER BY date DESC
  `;
  console.log(`Fetching reviews for business ID: ${business_id}`);
  connection.query(business_reviews_query, [business_id], (err, data) => {
    console.log('Query executed, data received:', data);
    if(err) { 
      console.log(err);
      res.json({});
    }
    else if (data.length === 0) { //some businesses may have no reviews
      res.json({error: 'No reviews found for this business'});
    }
    else{
      res.json(data);
    }
  });
}

//Bella: Rotue to get tips for a business
//At this point, the user has already selected a business and has now clicked the tips button to look at the tips
const business_tips = async function(req, res) {
  const business_id = req.params.business_id;
  const business_tips_query = `
    SELECT t.date, t.text, u.name 
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
