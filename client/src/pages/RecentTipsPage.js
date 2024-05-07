import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

export default function RecentTipsPage() {
    const [tips, setTips] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/recent_5sb_tips`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch'); // Throws an error if response is not OK
            }
            return res.json();
        })
        .then(resJson => {
            setTips(resJson);
            setLoading(false);
        })
        .catch(error => {
            setError(error.toString());
            setLoading(false);
        });
    }, []);
    

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading tip information!</Typography>;
    if (!tips.length) return <Typography>No tips found!</Typography>;

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Typography variant="h4" gutterBottom>Recent Tips</Typography>
                <Button component={Link} to={`/explore-tips`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    Back
                </Button>
            </div>
            {tips.map((tips, index) => (
                <Card key={index} style={{ marginBottom: 8 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tipper Name:  
                            <Link to={`/user/${tips.user_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {tips.username}
                            </Link> 
                            ({tips.review_count} tips)
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Business Name:  
                            <Link to={`/business/${tips.business_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {tips.businessName}
                            </Link>
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Date: {new Date(tips.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            {tips.text}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
    
}