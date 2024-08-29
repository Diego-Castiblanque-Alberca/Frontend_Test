import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import './user-card.css';

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