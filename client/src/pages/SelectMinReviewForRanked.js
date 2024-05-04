import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
const config = require('../config.json');

function SelectMinReviewForRanked() {
    const [minrev, setMinRev] = useState('');
    const [revcount, setRevCount] = useState('');
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (minrev.trim() && revcount.trim()) {
            navigate(`/top_business_postal?minrev=${minrev}&revcount=${revcount}`);
        } else {
            alert("Please enter values for both parameters.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Search for Top Businesses by Postal Code
            </Typography>
            <TextField
                label="Minimum User Review Count"
                variant="outlined"
                value={minrev}
                onChange={(e) => setMinRev(e.target.value)}
                fullWidth
                style={{ marginBottom: 20 }}
            />
            <TextField
                label="Minimum Business Reviews"
                variant="outlined"
                value={revcount}
                onChange={(e) => setRevCount(e.target.value)}
                fullWidth
                style={{ marginBottom: 20 }}
            />
            <Button onClick={handleNavigate} variant="contained" color="primary" size="large">
                View Top Businesses
            </Button>
        </div>
    );
}

export default SelectMinReviewForRanked;
