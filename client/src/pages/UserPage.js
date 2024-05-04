import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link and useParams

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const config = require('../config.json');

    const { userId } = useParams();

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch user:", error);
                setError("Sorry, friend not in the database!");
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found.</div>;

    // Function to render links to friends' pages, assuming friends is a comma-separated string
    const renderFriendLinks = (friends) => {
        if (!friends) return 'No friends';

        // Assuming we only render valid users (simulated by ensuring the ID looks correct)
        return friends.split(',')
            .map(friendId => friendId.trim())
            .filter(friendId => friendId)  // Only process non-empty, trimmed IDs
            .map(friendId => (
                <Link key={friendId} to={`/user/${friendId}`} style={{ marginRight: '10px' }}>
                    {friendId}
                </Link>
            ));
    };

    return (
        <div>
            <h1>User Details</h1>
            <div><strong>Name:</strong> {user?.name}</div>
            <div><strong>User ID:</strong> {user?.user_id}</div>
            <div><strong>Review Count:</strong> {user?.review_count}</div>
            <div><strong>Yelping Since:</strong> {user?.yelping_since}</div>
            <div><strong>Useful:</strong> {user?.useful}</div>
            <div><strong>Funny:</strong> {user?.funny}</div>
            <div><strong>Cool:</strong> {user?.cool}</div>
            <div><strong>Elite:</strong> {user?.elite}</div>
            <div><strong>Friends:</strong> {renderFriendLinks(user?.friends)}</div>
            <div><strong>Fans:</strong> {user?.fans}</div>
            <div><strong>Average Stars:</strong> {user?.average_stars}</div>
        </div>
    );
};

export default UserPage;
