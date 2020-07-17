import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from './logo.jpg';
import './App.css';
import Login from './components/Login';
import NameDisplay from './components/NameDisplay';
import BlogList from './components/BlogList';
import LogoutButton from './components/LogoutButton';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import loginService from './services/login';
import { initBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer';
import { setNotificationMessage, clearNotificationMessage } from './reducers/notificationReducer';

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const notification = useSelector(state => state.notification);
  const [user, setUser] = useState(null);
  const addBlogFormRef = useRef();

  const showNotification = (msg, isError) => {
    console.log(`Setting notification ${msg}`);
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
        setUser(storedUser);
        dispatch(initBlogs(storedUser.token));
      }
    }
    tryGetUser();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login(username, password);
      setUser(loggedInUser);
      dispatch(initBlogs(loggedInUser.token))
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } catch (err) {
      showNotification('Incorrect username and/or password', true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
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
    if(window.confirm('Are you sure you want to delete this blog?'))
    {
      dispatch(deleteBlog(id, user.token));
      showNotification(`User ${user.name} deleted a blog`, false);
    }
  };

  return (
    <div className="App">
      {notification.msg && <Notification msg={notification.msg} isError={notification.isError} />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {!user && <Login handleLogin={handleLogin} />}
      {user && <NameDisplay fullName={user.name} />}
      {user && <LogoutButton handleLogout={handleLogout} />}
      {user &&
        <Togglable buttonLabel='new blog' ref={addBlogFormRef}>
          <AddBlogForm handleAddBlog={handleAddBlog} />
        </Togglable>}
      {user && <BlogList user={user} blogs={blogs.sort((a,b) => {return a.likes > b.likes ? -1 : 1;})} handleLike={handleLike} handleDelete={handleDelete}/>}
    </div>
  );
}

export default App;
