import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.data);
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
