import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import './user-card.css';

/**
 * UserCard component that displays user information.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.user - Object containing user information.
 * @param {number} props.user.id - User ID.
 * @param {string} props.user.name - User name.
 * @param {string} props.user.email - User email.
 * @param {string} props.user.phone - User phone.
 * @param {string} props.user.avatar - URL of the user's avatar .
 * @param {React.Ref} ref - Reference for the component.
 * @returns {JSX.Element} JSX element representing the user card.
 */

/** 
 * This component is a child component of the ListUsers component. 
 * It receives a user object as a prop and displays the user's information. 
 * The component uses the forwardRef hook to forward the ref to the div element.  
 * The UserCard component is a functional component that uses the PropTypes library to define the prop types for the user object. 
 * */ 

const UserCard = forwardRef(function UserCard({ user }, ref) {
    return (
        <div ref={ref} className="user-card-container">
            <img className='user-card-img' src={user.avatar} alt="avatar.jpg" />
            <p className='user-card-name'>{user.name}</p>
            <p className='user-card-email'>{user.email}</p>
            <p className='user-card-phone'>{user.phone}</p>
        </div>
    );
});

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
};

export { UserCard };