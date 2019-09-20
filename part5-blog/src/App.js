import React, { useState, useEffect } from 'react';
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
import blogService from './services/blogs';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ msg: '', isError: false });

  const showNotification = (msg, isError) => {
    setNotification({ msg, isError });
    setTimeout(function () {
      setNotification({ msg: '', isError: false });
    }, 2000);
  };

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
        let fetchedBlogs = await fetchBlogsForUser(storedUser.token);
        setBlogs(fetchedBlogs);
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
  };

  const handleAddBlog = async (blog) => {
    const savedBlog = await blogService.addBlog(blog, user.token);
    console.log(savedBlog);
    setBlogs(blogs.concat({
      author: savedBlog.author,
      id: savedBlog.id,
      likes: savedBlog.likes,
      title: savedBlog.title,
      url: savedBlog.url,
      user: savedBlog.user.id
    }));
    showNotification(`New blog added: ${savedBlog.title} by ${savedBlog.author}`, false);
  };

  const handleLike = async (blog) => {
    console.log('liking blog', user);
    var updatedBlog = await blogService.updateBlog(blog, user.token);
    setBlogs(blogs.filter(x => x.id !== updatedBlog.id).concat(updatedBlog));
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this blog?'))
    {
      await blogService.deleteBlog(id, user.token);
      setBlogs(blogs.filter(x => x.id !== id));
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
        <Togglable buttonLabel='new blog'>
          <AddBlogForm handleAddBlog={handleAddBlog} />
        </Togglable>}
      {user && <BlogList user={user} blogs={blogs.sort((a,b) => {return a.likes > b.likes ? -1 : 1;})} handleLike={handleLike} handleDelete={handleDelete}/>}
    </div>
  );
}

export default App;
