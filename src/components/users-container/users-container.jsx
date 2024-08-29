import { fetchUsers } from "../../services/fetchUsers.js";
import { ListUsers } from "../list-users-cards/list-users-cards.jsx";
import { useState, useEffect } from 'react';
import './users-container.css';

/**
 * UsersContainer component that retrieves an initial list of users and displays a list of users.
 * 
 * @component
 * @returns {JSX.Element} JSX element representing the users container.
 */

// This component is the parent component for the ListUsers component.
export function UsersContainer() {
    // State variables to manage the users, loading, and error states
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users when the component mounts
    useEffect(() => {
        async function loadUsers() {
            try {
                const fetchedUsers = await fetchUsers(); 
                setUsers(fetchedUsers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);
    
    // Display loading message while fetching users, display error message if an error occurs, or display the list of users
    return (
        loading && <div className="loading-frame">Loading...</div> 
        ||
        error && console.log('Error: ', error) 
        ||
        <div className='users-container'>
            <h1 className="users-tittle">Users List</h1>
            <ListUsers users={users} />
        </div>)
}

export default UsersContainer;