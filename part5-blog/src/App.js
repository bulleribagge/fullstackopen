import React, { useState, useEffect } from 'react';
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
import { initBlogs, createBlog } from './reducers/blogReducer';
import { setNotificationMessage, clearNotificationMessage } from './reducers/notificationReducer';

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const notification = useSelector(state => state.notification);
  const [user, setUser] = useState(null);
  //const [notification, setNotification] = useState({ msg: '', isError: false });

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
    showNotification(`New blog added: ${blog.title} by ${blog.author}`, false);
  };

  const handleTestNotification = () => {
    showNotification('testing', false);
  }

  const handleLike = async (blog) => {
    console.log('liking blog', user);
    //var updatedBlog = await blogService.updateBlog(blog, user.token);
    //setBlogs(blogs.filter(x => x.id !== updatedBlog.id).concat(updatedBlog));
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this blog?'))
    {
      //await blogService.deleteBlog(id, user.token);
      //setBlogs(blogs.filter(x => x.id !== id));
    }
  };

  return (
    <div className="App">
      {notification.msg && <Notification msg={notification.msg} isError={notification.isError} />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button onClick={handleTestNotification}>TEST NOTIFICATION</button>
      {!user && <Login handleLogin={handleLogin} />}
      {user && <NameDisplay fullName={user.name} />}
      {user && <LogoutButton handleLogout={handleLogout} />}
      {user &&
        <Togglable buttonLabel='new blog'>
          <AddBlogForm handleAddBlog={handleAddBlog} />
        </Togglable>}
      {user && <BlogList user={user} blogs={blogs.sort((a,b) => {return a.likes > b.likes ? -1 : 1;})} handleLike={handleLike} handleDelete={handleDelete}/>}
    </div>
  );
}

export default App;
