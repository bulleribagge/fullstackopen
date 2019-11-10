import { Promise } from 'q';

const blogs = [
  {
    likes: 1,
    title: 'blog post #1',
    author: 'author #1',
    url: 'https://www.google.se/1'
  },
  {
    likes: 2,
    title: 'blog post #2',
    author: 'author #2',
    url: 'https://www.google.se/2'
  },
  {
    likes: 3,
    title: 'blog post #3',
    author: 'author #3',
    url: 'https://www.google.se/3'
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };