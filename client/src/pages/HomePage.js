import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('city'); // Default search by city


    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            // Redirect to search page with the search query
            navigate(`/search/businesses?${searchBy}=${searchQuery}`);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to _ Search</h1>
            <TextField
                label="Search by category"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ margin: '20px' }}
            />
            <RadioGroup
                aria-label="searchBy"
                name="searchBy"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}>
                <FormControlLabel value="city" control={<Radio />} label="City" />
                <FormControlLabel value="zipCode" control={<Radio />} label="Zip Code" />
            </RadioGroup>
            <Button variant="contained" onClick={handleSearch}>Search</Button>
            <Button component={Link} to={`/select-category-for-tips`} variant="contained">Explore Top Tips By Business Category</Button>
        </div>
    );
}