import { UserCard } from "../user-card/user-card";
import PropTypes from 'prop-types';
import './list-users-cards.css';

export function ListUsers({ users }) {
    return (
        <div className='list-users-container'>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
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