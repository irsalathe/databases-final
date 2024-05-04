import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

function CategorySearchForTipsPage() {
    const [category, setCategory] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleNavigate = () => {
        if (category.trim()) { // Check if the category is not just empty spaces
            navigate(`/top_business_tips/${category}`);
        } else {
            alert("Please enter a category to search for tips.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Search for Tips by Category
            </Typography>
            <TextField
                label="Enter a Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                style={{ marginBottom: 20 }}
            />
            <Button onClick={handleNavigate} variant="contained" color="primary" size="large">
                View Tips
            </Button>
        </div>
    );
}

export default CategorySearchForTipsPage;
