import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
const config = require('../config.json');

export default function HomePage() {
    const [searchParams, setSearchParams] = useState({
        category: '',
        city: '',
        postalCode: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchParams({ ...searchParams, [name]: value });
    };
    
    const search = () => {
        const { category, city, postalCode } = searchParams;
        let searchQuery = '';
        if (category) searchQuery += `categories=${category}`;
        if (city) {
            if (searchQuery !== '') searchQuery += '&';
            searchQuery += `city=${city}`;
        }
        if (postalCode) {
            if (searchQuery !== '') searchQuery += '&';
            searchQuery += `postal_code=${postalCode}`;
        }
        window.location.href = `/general_search?${searchQuery}`;
    };
    
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
        >
            <Typography variant="h2" gutterBottom>Welcome to a Traveler's Guide to California!</Typography>
            <Typography variant="h4" gutterBottom>Figure out where to go! (or where not to go)</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom="20px">
                <TextField
                    name="category"
                    label="Category"
                    variant="outlined"
                    margin="normal"
                    value={searchParams.category}
                    onChange={handleChange}
                />
                <TextField
                    name="city"
                    label="City"
                    variant="outlined"
                    margin="normal"
                    value={searchParams.city}
                    onChange={handleChange}
                />
                <TextField
                    name="postalCode"
                    label="Postal Code"
                    variant="outlined"
                    margin="normal"
                    value={searchParams.postalCode}
                    onChange={handleChange}
                />
                <Button onClick={search} startIcon={<SearchIcon />} variant="contained" style={{ marginLeft: '10px' }}>
                    Search
                </Button>
            </Box>
            <Button component={Link} to={`/select-category-for-tips`} variant="contained">Explore Top Tips By Business Category</Button>
            <Button component={Link} to={`/select-min-review-for-ranked`} variant="contained">Explore Top Business Reviews by Postal Code</Button>
        </Box>
    );
}
