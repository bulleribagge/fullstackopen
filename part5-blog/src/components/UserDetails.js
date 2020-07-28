import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetails = () => {
    const id = useParams().id;
    const user = useSelector(state => state.users).filter(u => u.id === id)[0];
    return (
        <div>
            {user &&
                <div>
                    <h1>{user.username}</h1>
                    {user.blogs.length > 0 &&
                        <div>
                            <h2>added blogs</h2>
                            <ul>
                                {user.blogs.map((b) => (
                                    <li key={b.id}>{b.title}</li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default UserDetails;
