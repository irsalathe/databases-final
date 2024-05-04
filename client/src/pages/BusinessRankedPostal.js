import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
const config = require('../config.json');

export default function BusinessRankedPostal() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const minrev = queryParams.get('minrev');
    const revcount = queryParams.get('revcount');

    const [topBusinesses, setTopBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (minrev && revcount) {
            fetch(`http://${config.server_host}:${config.server_port}/top_business_postal?minrev=${minrev}&revcount=${revcount}`)
            .then(res => res.json())
            .then(
                resJson => {
                    setTopBusinesses(resJson);
                    setLoading(false);
                },
                error => {
                    setError(error);           
                    setLoading(false);
                }
            );
        }
    }, [minrev, revcount]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;
    if (!topBusinesses || topBusinesses.length === 0) return <Typography>No businesses found.</Typography>;
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top Businesses by Postal Code
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell>Postal Code</TableCell>
                        <TableCell>Review</TableCell>
                        <TableCell>Stars</TableCell>
                        <TableCell>Useful</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topBusinesses.map((business, index) => (
                        <TableRow key={index}>
                            <TableCell>{business.business_name}</TableCell>
                            <TableCell>{business.postal_code}</TableCell>
                            <TableCell>{business.text}</TableCell>
                            <TableCell>{business.stars}</TableCell>
                            <TableCell>{business.useful}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" onClick={() => window.history.back()} style={{ marginTop: 20 }}>
                Back
            </Button>
        </div>
    );
}
