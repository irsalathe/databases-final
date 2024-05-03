import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
const config = require('../config.json');

export default function BusinessInfoPage() {
    const { business_id } = useParams();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/business/${business_id}`)
        .then(res => res.json())
        .then(
            resJson => {
                if(typeof resJson.hours === 'string'){
                    resJson.hours = JSON.parse(resJson.hours).hours; //parsing string to json
                }
                setBusiness(resJson);
                setLoading(false);
            },
            error => {
                setError(error);
                setLoading(false);
            }
        );
    }, [business_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading business information!</p>;
    if (!business) return <p>No business found!</p>;

    const renderHoursTable = (hours) => {
        return(
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Hours</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(hours).map(([day, hours]) => (
                        <TableRow key={day}>
                            <TableCell component ="th" scope="row">
                                {day}
                            </TableCell>
                            <TableCell>{hours}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    return (
        <div>
            <h1>{business.name}</h1>
            <Button component={Link} to={`/business_reviews/${business_id}`} variant = "contained" color = "primary">
                Reviews
            </Button>
            <Button component={Link} to={`/business_tips/${business_id}`} variant = "contained" color = "primary">
                Tips
            </Button>
            <p>Address: {business.address}</p>
            <p>City and Postal Code: {business.city}, {business.postal_code}</p>
            <p>Average Stars: {business.stars}</p>
            <p>Total Reviews: {business.review_count}</p>
            <p>Hours of Operation: {business.hours ? renderHoursTable(business.hours): 'Not Available'}</p> {/*make pretty*/}
            <p>Attributes: {business.attributes}</p>

        </div>
    );
}