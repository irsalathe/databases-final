import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

export default function RecentReviewsPage() {
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/recent_5starbusiness_reviews`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch'); // Throws an error if response is not OK
            }
            return res.json();
        })
        .then(resJson => {
            setReview(resJson);
            setLoading(false);
        })
        .catch(error => {
            setError(error.toString());
            setLoading(false);
        });
    }, []);
    

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading review information!</Typography>;
    if (!review.length) return <Typography>No reviews found!</Typography>;

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Typography variant="h4" gutterBottom>100 Most Recent Reviews</Typography>
                <Button component={Link} to={`/reviews`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    Back
                </Button>
            </div>
            {review.map((review, index) => (
                <Card key={index} style={{ marginBottom: 8 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Reviewer Name: {review.name} ({review.review_count} reviews)
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Business Name: {review.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Date: {new Date(review.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                            {review.text}
                        </Typography>
                        <Typography variant="body1">
                            Stars: {"⭐".repeat(review.stars)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
    
}