import { UserCard } from "../user-card/user-card";
import { useEffect, useState, useRef } from 'react';
import { fetchUsers } from "../../services/fetchUsers";
import PropTypes from 'prop-types';
import './list-users-cards.css';

/**
 * ListUsersCards component that displays a list of user cards with infinite scroll functionality.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Array} props.users - Array of objects containing user information.
 * @param {number} props.users.id - User ID.
 * @param {string} props.users.name - User name.
 * @param {string} props.users.email - User email.
 * @param {string} props.users.phone - User phone.
 * @param {string} props.users.avatar - URL of the user's avatar.
 * @returns {JSX.Element} JSX element representing the list of user cards.
 */

/** 
 * This component is a child component of the UsersContainer component. 
 * It receives an array of user objects as a prop and displays a list of user cards.
 * The component also uses the useRef hook to create a reference to user card element in the list to detect when the user scrolls to the end of the list.
 * The ListUsers component fetches new users when the user scrolls to the end of the list using the Intersection Observer API to detect when the user scrolls to the end of the list.
 */

export function ListUsers({ users }) {
    const [nearToEnd, setNearToEnd] = useState(false);
    const [newUsers, setNewUsers] = useState([...users]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [changeRef, setChangeRef] = useState(false);
    // Reference is made to one of the last letters in the list.
    const userScrollLimitRef = useRef(null);
    
    // Intersection Observer to detect when the user scrolls to the end of the list
    useEffect(() => {
        const observerUser = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setNearToEnd(true);
                if (userScrollLimitRef.current) {
                    observerUser.unobserve(userScrollLimitRef.current);
                    userScrollLimitRef.current = null;
                }
            }
        }, { threshold: 1 });

        observerUser.observe(userScrollLimitRef.current);

        // Cleanup function to unobserve the element when the component unmounts
        return () => {
            if (userScrollLimitRef.current) {
                observerUser.unobserve(userScrollLimitRef.current);
            }
        };
    }, [changeRef]);

    // Fetch new users when the user scrolls to the end of the list
    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                const fetchedUsers = await fetchUsers();
                setNewUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
                setChangeRef(!changeRef);
                if (error) {
                    setError(null);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        if (nearToEnd) {
            loadUsers();
            setNearToEnd(false);
        }
        return () => {
            setLoading(false);
        };
    }, [error, nearToEnd, users, changeRef]);
    
    // Display the list of user cards, loading message, or error message
    return (
        error && console.log('Error: ', error)
        ||
        <div className='list-users-container'>
            {newUsers.map((user, index, newUsers) => {
                return <UserCard
                    ref={newUsers.length - 5 === index ? userScrollLimitRef : null}
                    key={user.id}
                    user={user} />;
            })}
            {loading && <div className="loading-list">Loading...</div>}
        </div>
    )
}
//
ListUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    })).isRequired,
};