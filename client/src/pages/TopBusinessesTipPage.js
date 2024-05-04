import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
const config = require('../config.json');

export default function TopBusinessesTipPage() {
    const {category} = useParams();
    const [businessTips, setBusinessTips] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(category){
            fetch(`http://${config.server_host}:${config.server_port}/top_business_tips/${category}`)
            .then(res => res.json())
            .then(
                resJson => {
                    setBusinessTips(resJson);
                    setLoading(false);
                },
                error => {
                    setError(error);
                    setLoading(false);
                }
            );
        }
        }, [category]);
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading tip information!</Typography>;
    if (!businessTips.length) return <Typography>No tips found!</Typography>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Top Tips for {category}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Tip</TableCell>
                        <TableCell>Compliments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {businessTips.length > 0 ? businessTips.map((tip, index) => (
                        <TableRow key={index}>
                            <TableCell>{tip.name}</TableCell>
                            <TableCell>{tip.address}</TableCell>
                            <TableCell>{tip.stars}</TableCell>
                            <TableCell>{tip.tip_text}</TableCell>
                            <TableCell>{tip.compliment_count}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={5} align="center">No Tips Available</TableCell>
                    </TableRow>}
                </TableBody>
            </Table>
            <Button component={Link} to="/" variant="contained" color="primary" style={{ marginTop: 20 }}>
                Back to Home
            </Button>
        </div>
    );
}

