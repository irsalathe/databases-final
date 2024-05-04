const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get('/business/:business_id', routes.business);
app.get('/business_reviews/:business_id', routes.business_reviews);
app.get('/business_tips/:business_id', routes.business_tips);
app.get('/top_business_tips/:category', routes.top_business_tips)
app.get('/search/businesses', routes.search_category);
app.get('/top_business_postal', routes.top_business_reviews_by_postal_code);
app.get('/general_search', routes.general_search);  // Use a suitable path for the new search functionality

app.get('/active_users', routes.active_users);
app.get('/user/:user_id', routes.getUserDetails);
app.get('/isvalid/:user_id', routes.validateFriends);
app.get('/general_search', routes.general_search); 

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
