import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

test('renders content', () => {
  const blog = {
    author: 'bengt',
    title: 'bengts bengt',
    likes: 0
  };

  const component = render(
    <SimpleBlog blog={blog}></SimpleBlog>
  );

  const authorTitleDiv = component.container.querySelector('.titleAuthor');

  expect(authorTitleDiv).toHaveTextContent(
    'bengts bengt bengt'
  );

  const likesDiv = component.container.querySelector('.numLikes');

  expect(likesDiv).toHaveTextContent(
    'blog has 0 likes'
  );
});

test('calls function', () => {
  const blog = {
    author: 'bengt',
    title: 'bengts bengt',
    likes: 0
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler}></SimpleBlog>
  );

  const likeButton = getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls.length).toBe(2);
});