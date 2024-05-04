import React, { useEffect, useState } from 'react';

const ActiveUsers = () => {
    const [users, setUsers] = useState([]);
    const [limit, setLimit] = useState(10);  // Default limit
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const config = require('../config.json');

    useEffect(() => {
        setLoading(true); // Set loading to true whenever the fetch starts
        console.log("Fetching active users with limit:", limit);

        fetch(`http://${config.server_host}:${config.server_port}/active_users?limit=${limit}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log data to console for debugging
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch active users:', err);
                setError(`Failed to load data: ${err.message}`);
                setLoading(false);
            });
    
    }, [limit]); // Depend on limit, re-fetch when it changes

    if (loading) return <div>Loading active users...</div>;
    if (error) return <div>Error loading active users: {error}</div>;
    if (!users.length) return <div>No active users found!</div>;

    return (
        <div>
            <h2>Active Users</h2>
            <div>
                <input 
                    type="number" 
                    value={limit} 
                    onChange={e => setLimit(e.target.value)} 
                    min="1" 
                    style={{ marginRight: '10px' }}
                />
                <button onClick={() => setLoading(true)}>Refresh List</button>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        {user.name} - Reviews: {user.review_count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveUsers;
