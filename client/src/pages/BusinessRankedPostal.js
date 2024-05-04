import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';

export default function BusinessRankedPostal() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const minrev = queryParams.get('minrev');
    const revcount = queryParams.get('revcount');

    const [topBusinesses, setTopBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (minrev && revcount) {
                    const response = await fetch(`/top_business_postal?minrev=${minrev}&revcount=${revcount}`);
                    const data = await response.json();
                    setTopBusinesses(data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
    
        fetchData();
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
                        <TableCell>Review ID</TableCell>
                        <TableCell>Stars</TableCell>
                        <TableCell>Useful</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {topBusinesses.map((business, index) => (
                        <TableRow key={index}>
                            <TableCell>{business.business_name}</TableCell>
                            <TableCell>{business.postal_code}</TableCell>
                            <TableCell>{business.review_id}</TableCell>
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
