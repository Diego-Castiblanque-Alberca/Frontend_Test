import { fetchUsers } from "../../services/fetchUsers.js";
import { ListUsers } from "../list-users-cards/list-users-cards.jsx";
import { useState, useEffect } from 'react';
import './users-container.css';


export function UsersContainer() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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