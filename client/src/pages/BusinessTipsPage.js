import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tips information!</p>;
    if (!tips) return <p>No tips found!</p>;

    return (
        <div>
            <h1>Tips</h1>
            <Button component={Link} to={`/business/${business_id}`} variant = "contained" color = "primary">
                Back to Business Information
            </Button>
            <Button component={Link} to={`/business_reviews/${business_id}`} variant = "contained" color = "primary">
                Reviews
            </Button>
            <p>Date: </p>

        </div>
    );
}