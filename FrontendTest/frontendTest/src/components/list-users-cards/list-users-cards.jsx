import { UserCard } from "../user-card/user-card";
import { useEffect, useState, useRef } from 'react';
import { fetchUsers } from "../../services/fetchUsers";
import PropTypes from 'prop-types';
import './list-users-cards.css';

export function ListUsers({ users }) {
    const [nearToEnd, setNearToEnd] = useState(false);
    const [newUsers, setNewUsers] = useState([...users]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userScrollLimitRef = useRef(null);
    const [changeRef, setChangeRef] = useState(false);
    
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
    }, [error, nearToEnd, users, changeRef]);

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

ListUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    })).isRequired,
};