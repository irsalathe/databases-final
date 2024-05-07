import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const config = require('../config.json');

export default function BusinessReviewsPage() {
    const { business_id } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/business_reviews/${business_id}`)
        .then(res => res.json())
        .then(
            resJson => {
                setReview(resJson);
                setLoading(false);
            },
            error => {
                setError(error);
                setLoading(false);
            }
        );
    }, [business_id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading review information!</Typography>;
    if (!review.length) return <Typography>No reviews found!</Typography>;

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Typography variant="h4" gutterBottom>Reviews</Typography>
                <Button component={Link} to={`/business/${business_id}`} variant="contained" color="primary" style={{ margin: '0 8px' }}>
                    Back to Business Information
                </Button>
                <Button component={Link} to={`/business_tips/${business_id}`} variant="contained" color="primary">
                    Tips
                </Button>
            </div>
            {review.map((review, index) => (
                <Card key={index} style={{ marginBottom: 8 }}>
                    <CardContent>
                    <Link to={`/user/${review.user_id}`} style={{ textDecoration: 'none' }}>
                        <Typography color="textSecondary" gutterBottom>
                            Reviewer Name: {review.name} ({review.review_count} reviews)
                        </Typography>
                    </Link>
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