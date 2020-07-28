import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../reducers/usersReducer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';

export const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    useEffect(() => {
        async function getUsers() {
            //load users
            const res = await axios.get('http://localhost:3001/api/users');
            dispatch(setUsers(res.data));
        }
        getUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <TableContainer>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                name
                            </TableCell>
                            <TableCell>
                                blogs created
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell>
                                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                                </TableCell>
                                <TableCell>{u.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;
