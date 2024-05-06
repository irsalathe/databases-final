import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

const ReviewsLinksPage = () => {

  return (
    <div>
        <div style={{ textAlign: 'center', marginBottom: '16px', marginTop: '50px' }}>
                <Button component={Link} to={`/all_reviews`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    100 Most Recent Reviews
                </Button>
                <Button component={Link} to={`/select-min-review-for-ranked`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    Explore Top Business Reviews by Postal Code
                </Button>
        </div>
    </div>
  );
};

export default ReviewsLinksPage;
