import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NameDisplay from './components/NameDisplay';
import BlogList from './components/BlogList';
import LogoutButton from './components/LogoutButton';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import loginService from './services/login';
import { initBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer';
import { setNotificationMessage, clearNotificationMessage } from './reducers/notificationReducer';
import { setLoggedInUser, clearLoggedInUser } from './reducers/userReducer';
import Container from '@material-ui/core/Container';
import { Toolbar, Button, AppBar, Typography } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const notification = useSelector(state => state.notification);
  const user = useSelector(state => state.user);
  const addBlogFormRef = useRef();

  const showNotification = (msg, isError) => {
    dispatch(setNotificationMessage({ msg, isError }));
    setTimeout(function () {
      dispatch(clearNotificationMessage());
    }, 2000);
  };

  useEffect(() => {
    async function tryGetUser() {
      const maybeLoggedInUser = window.localStorage.getItem('loggedInUser');
      if (maybeLoggedInUser) {
        const storedUser = JSON.parse(maybeLoggedInUser);
        dispatch(setLoggedInUser(storedUser));
        dispatch(initBlogs(storedUser.token));
      }
    }
    tryGetUser();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login(username, password);
      dispatch(setLoggedInUser(loggedInUser));
      dispatch(initBlogs(loggedInUser.token));
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } catch (err) {
      showNotification('Incorrect username and/or password', true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    dispatch(clearLoggedInUser(null));
  };

  const handleAddBlog = async (blog) => {
    dispatch(createBlog(blog, user.token));
    addBlogFormRef.current.toggleVisibility();
    showNotification(`New blog added: ${blog.title} by ${blog.author}`, false);
  };

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog, user.token));
    showNotification(`User ${user.name} liked blog ${blog.title}`, false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id, user.token));
      showNotification(`User ${user.name} deleted a blog`, false);
    }
  };

  return (
    <Container>
      <Router>
        {notification.msg && <Notification msg={notification.msg} isError={notification.isError} />}
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to='/'>
              Blogs
          </Button>
            <Button color="inherit" component={Link} to='/users/'>
              Users
          </Button>
            <Typography style={{ 'margin-left': 'auto' }}>
              {user && <NameDisplay fullName={user.name} />}
              {user && <LogoutButton handleLogout={handleLogout} />}
            </Typography>
          </Toolbar>
        </AppBar>
        {!user && <Login handleLogin={handleLogin} />}
        <Switch>
          <Route path="/users/:id">
            <UserDetails />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetails handleLike={handleLike} handleDelete={handleDelete} />
          </Route>
          <Route path="/">
            <div>
              {user && <BlogList blogs={blogs.sort((a, b) => { return a.likes > b.likes ? -1 : 1; })} />}
              {user &&
                <Togglable buttonLabel='new blog' ref={addBlogFormRef}>
                  <AddBlogForm handleAddBlog={handleAddBlog} />
                </Togglable>}
            </div>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
