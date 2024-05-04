import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const config = require('../config.json');

const GeneralSearchResultsPage = () => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useState({
        category: '',
        city: '',
        postalCode: '',
        review_count: '',
        stars: '',
        tipCount: ''
    });

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/general_search?${new URLSearchParams(window.location.search)}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => setError('Failed to fetch data'));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const search = () => {
        const { category, city, postalCode, review_count, stars, tipCount } = searchParams;
        let searchQuery = '';
        if (category) searchQuery += `category=${category}&`;
        if (city) searchQuery += `city=${city}&`;
        if (postalCode) searchQuery += `postal_code=${postalCode}&`;
        if (review_count) searchQuery += `rev_count=${review_count}&`;
        if (stars) searchQuery += `stars=${stars}&`;
        if (tipCount) searchQuery += `tipcount=${tipCount}&`;
    
        // Extract parameters from the current URL
        const urlParams = new URLSearchParams(window.location.search);
        const params = ['categories', 'city', 'postal_code'];
        params.forEach(param => {
            const value = urlParams.get(param);
            if (value) searchQuery += `${param}=${value}&`;
        });
    
        window.location.href = `/search/businesses?${searchQuery}`;
    };

    if (error) return <p>Error: {error}</p>;
    if (!results) return <p>Loading...</p>;
    if (results.length === 0) return <p>No results found.</p>;

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom="20px">
                <TextField
                    name="review_count"
                    label="Review Count"
                    variant="outlined"
                    margin="normal"
                    value={searchParams.review_count}
                    onChange={handleChange}
                    />
                <TextField
                    name="stars"
                    label="Stars"
                    variant="outlined"
                    margin="normal"
                    value={searchParams.stars}
                    onChange={handleChange}
                    />
                <TextField
                    name="tipCount"
                    label="Tip Count"
                    variant="outlined"
                    margin="normal"
                    value={searchParams.tipCount}
                    onChange={handleChange}
                    />
                <Button onClick={search} startIcon={<SearchIcon />} variant="contained" style={{ marginLeft: '10px' }}>
                    Search
                </Button>
            </Box>
            <h1>Search Results</h1>
            {results.map((item, index) => (
                <div key={index} style={{ padding: '10px', margin: '5px', border: '1px solid #ccc' }}>
                    <Link to={`/business/${item.business_id}`} style={{ textDecoration: 'none' }}> {/* Link to business detail page */}
                        <h2>{item.name}</h2>
                    </Link>
                    <p>{item.address}</p>
                    <p>{item.city}, {item.postal_code}</p>
                    <p>Stars: {item.stars} ({item.review_count} reviews)</p>
                </div>
            ))}
        </div>
    );
};

export default GeneralSearchResultsPage;
