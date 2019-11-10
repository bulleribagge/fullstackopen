import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('Extra content is hidden by default', () => {
  const blog = {
    author: 'bengt',
    title: 'bengts bengt',
    url: 'https://www.google.se',
    user: '43432-34214356432-543254-543',
    likes: 0
  };

  const user = {
    id: '43432-34214356432-543254-543'
  };

  const component = render(
    <Blog blog={blog} user={user}></Blog>
  );

  const authorTitleDiv = component.container.querySelector('.titleAuthor');

  expect(authorTitleDiv).toHaveTextContent(
    'bengts bengt bengt'
  );

  const likesDiv = component.container.querySelector('.expandDiv');

  expect(likesDiv).not.toBeVisible();
});

test('Extra content is shown when expanding', () => {
  const blog = {
    author: 'bengt',
    title: 'bengts bengt',
    url: 'https://www.google.se',
    user: '43432-34214356432-543254-543',
    likes: 0
  };

  const user = {
    id: '43432-34214356432-543254-543'
  };

  const component = render(
    <Blog blog={blog} user={user}></Blog>
  );

  const authorTitleDiv = component.container.querySelector('.titleAuthor');

  expect(authorTitleDiv).toHaveTextContent(
    'bengts bengt bengt'
  );

  fireEvent.click(authorTitleDiv);

  const extraDiv = component.container.querySelector('.expandDiv');

  expect(extraDiv).toBeVisible();
  expect(extraDiv).toHaveTextContent(blog.url);
  expect(extraDiv).toHaveTextContent(`Added by ${blog.user}`);
  expect(extraDiv).toHaveTextContent(`${blog.likes} likes`);
});
