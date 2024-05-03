import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, getTouchRippleUtilityClass, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

export default function BusinessReviewsPage() {
    const { business_id } = useParams();
    const [tips, setTips] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/business_tips/${business_id}`)
        .then(res => res.json())
        .then(
            resJson => {
                setTips(resJson);
                setLoading(false);
            },
            error => {
                setError(error);
                setLoading(false);
            }
        );
    }, [business_id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading tip information!</Typography>;
    if (!tips.length) return <Typography>No tips found!</Typography>;

    return(
        <div>
            <Typography variant="h4" gutterBottom>Useful Tips</Typography>
            <Button component={Link} to={`/business/${business_id}`} variant="contained" color="primary">
                Back to Business Information
            </Button>
            <Button component={Link} to={`/business_reviews/${business_id}`} variant="contained" color ="primary">
                Reviews
            </Button>
            {tips.map((tips, index) => (
                <Card key={index} style={{marginBottom: 8}}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tipper Name: {tips.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Date: {tips.date}
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
