import React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentSection from './CommentSection';
import { Button, Typography } from '@material-ui/core';

const BlogDetails = ({ handleLike, handleDelete, history }) => {
    const id = useParams().id;
    const blog = useSelector(state => state.blogs).filter(b => b.id === id)[0];
    const user = useSelector(state => state.user);

    console.log(blog);

    const handleDeleteLocal = (id) => {
        handleDelete(id);
        history.push('/');
    };

    if (blog) {
        return (
            <div>
                <div>
                    <Typography variant="h4">{blog.title}</Typography>
                    <div>
                        <Typography>
                            {blog.url} <br />
                            {blog.likes} likes <Button onClick={() => handleLike(blog)}>like</Button><br />
                    Added by {blog.user.name}<br />
                        </Typography>
                        <Button onClick={() => handleDeleteLocal(blog.id)} style={user.id === blog.user.id ? { display: '' } : { display: 'none' }} >remove</Button>
                    </div>
                </div>
                <CommentSection blog={blog} />
            </div>
        );
    } else {
        return null;
    }
};

export default withRouter(BlogDetails);
