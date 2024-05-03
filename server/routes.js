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
  const businessID = req.params.business_id;
  console.log(`Received request for business ID: ${businessId}`);
  const business_query = `
    SELECT name, address, city, postal_code, stars, review_count, hours, attributes
    FROM Business
    WHERE business_id = ?
  `;
  connection.query(business_query, [businessID], (err, data) => {
    if(err || data.length === 0) {
      console.log(err);
      res.json({});
    }
    else {
      console.log('Data retrieved from the database: ', data[0]);
      res.json(data[0]);
    }
  });
}

const business_reviews = async function(req, res) {
  const businessID = req.params.business_id
  const business_reviews_query = `
    SELECT date, user_id, text, stars
    FROM Reviews
    WHERE business_id = ?
    ORDER BY date DESC
  `;
  connection.query(business_reviews_query, [businessID], (err, data) => {
    if(err) { //some businesses may have no reviews
      console.log(err);
      res.json({});
    }
    else if (data.length === 0) {
      res.json({error: 'No reviews found for this business'});
    }
    else{
      res.json(data);
    }
  });
}


module.exports = {
  business,
  business_reviews
}
