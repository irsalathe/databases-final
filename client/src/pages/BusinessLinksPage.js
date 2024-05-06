import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

const BusinessLinksPage = () => {

  return (
    <div>
        <div style={{ textAlign: 'center', marginBottom: '16px', marginTop: '50px' }}>
                <Button component={Link} to={`/general_search`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    All Businesses
                </Button>
        </div>
    </div>
  );
};

export default BusinessLinksPage;
