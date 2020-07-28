import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { Typography, TextField, Button, List, ListItemText } from '@material-ui/core';

const CommentSection = ({ blog }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const onAddComment = () => {
        var comment = document.getElementsByName('newComment')[0].value;
        if (comment) {
            dispatch(addComment(blog.id, comment, user.token));
            document.getElementsByName('newComment')[0].value = '';
        }
    };

    return (
        <div>
            <div>
                <Typography variant="h4">comments</Typography>
                <TextField type="text" name="newComment" label="newComment" />
                <Button onClick={() => onAddComment()}>add</Button>
                <List>
                    {blog.comments.map((c, idx) => (
                        <ListItemText key={idx}>{c.comment}</ListItemText>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default CommentSection;