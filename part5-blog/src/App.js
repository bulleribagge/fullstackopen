import React, { useState, useEffect } from 'react';
import logo from './logo.jpg';
import './App.css';
import Login from './components/Login';
import NameDisplay from './components/NameDisplay';
import BlogList from './components/BlogList';
import LogoutButton from './components/LogoutButton';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import loginService from './services/login';
import blogService from './services/blogs';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({msg: '', isError: false});

  const showNotification = (msg, isError) => {
    setNotification({msg, isError});
    setTimeout(function(){
      setNotification({msg: '', isError: false});
    }, 2000);
  }

  const fetchBlogsForUser = async (token) => {
    const fetchedBlogs = await blogService.getAll(token);
    return fetchedBlogs;
  };

  useEffect(() => {
    async function tryGetUser() {
      const maybeLoggedInUser = window.localStorage.getItem('loggedInUser');
      if (maybeLoggedInUser) {
        const storedUser = JSON.parse(maybeLoggedInUser);
        setUser(storedUser);
        const blogss = await fetchBlogsForUser(storedUser.token);
        setBlogs(blogss);
      }
    }
    tryGetUser();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await loginService.login(username, password);
      setUser(loggedInUser);
      setBlogs(await fetchBlogsForUser(loggedInUser.token));
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } catch (err) {
      showNotification('Incorrect username and/or password', true);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  }

  const handleAddBlog = async (blog) => {
    await blogService.addBlog(blog, user.token);
    setBlogs(blogs.concat(blog));
    showNotification(`New blog added: ${blog.title} by ${blog.author}`, false);
  }

  return (
    <div className="App">
      {notification.msg && <Notification msg={notification.msg} isError={notification.isError} />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {!user && <Login handleLogin={handleLogin} />}
      {user && <NameDisplay fullName={user.name} />}
      {user && <LogoutButton handleLogout={handleLogout} />}
      {user && <AddBlogForm handleAddBlog={handleAddBlog} />}
      {user && <BlogList blogs={blogs} />}
    </div>
  );
}

export default App;
