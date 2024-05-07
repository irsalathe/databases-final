import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

const TipsLinksPage = () => {

  return (
    <div>
        <div style={{ textAlign: 'center', marginBottom: '16px', marginTop: '50px' }}>
                <Button component={Link} to={`/select-category-for-tips`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    Explore Top Tips By Business Category
                </Button>
        </div>
    </div>
  );
};

export default TipsLinksPage;
