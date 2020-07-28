import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.data);
    case 'DELETE':
      return state.filter(x => x.id !== action.data);
    case 'UPDATE':
      return state.filter(x => x.id !== action.data.id).concat(action.data);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const createBlog = (data, token) => {
  return async (dispatch) => {
    const blog = await blogService.addBlog(data, token);
    dispatch({
      type: 'CREATE',
      data: blog,
    });
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, token);
    dispatch({
      type: 'DELETE',
      data: id
    });
  };
};

export const likeBlog = (blog, token) => {
  return async (dispatch) => {
    let updatedBlog = await blogService.likeBlog(blog, token);
    console.log(updatedBlog);
    dispatch({
      type: 'UPDATE',
      data: updatedBlog
    });
  };
};

export const addComment = (id, comment, token) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment, token);
    console.log(updatedBlog);
    dispatch({
      type: 'UPDATE',
      data: updatedBlog
    });
  };
};

export const initBlogs = (token) => {
    return async (dispatch) => {
        const blogs = await blogService.getAll(token);
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        });
    };
};

export default reducer;