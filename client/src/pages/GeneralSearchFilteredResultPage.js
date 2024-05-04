import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
const config = require('../config.json');

const GeneralSearchFilteredResultsPage = () => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    console.log(results);

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/search/businesses?${new URLSearchParams(window.location.search)}`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => setError('Failed to fetch data'));
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!results) return <p>Loading...</p>;
    if (results.length === 0) return <p>No results found.</p>;

    return (
        <div>
            <h1>Search Results</h1>
            {results.map((item, index) => (
                <div key={index} style={{ padding: '10px', margin: '5px', border: '1px solid #ccc' }}>
                    <Link to={`/business/${item.business_id}`} style={{ textDecoration: 'none' }}> {/* Link to business detail page */}
                        <h2>{item.name}</h2>
                    </Link>
                    <p>{item.address}</p>
                    <p>{item.city}, {item.postal_code}</p>
                    <p>Stars: {item.stars} ({item.review_count} reviews)</p>
                </div>
            ))}
        </div>
    );
};

export default GeneralSearchFilteredResultsPage;