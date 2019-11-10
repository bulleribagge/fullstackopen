import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs');

describe('<App />', () => {
  test('Should not show any blogs if user is not logged in', async () => {
    const component = render(<App />);
    await waitForElement(() => component.getByText('login'));

    var titleAuthorDivs = component.container.querySelectorAll('.titleAuthor');
    expect(titleAuthorDivs.length).toBe(0);
  });

  test('Should show all blogs if user is logged in', async () => {
    loginMock();
    const component = render(<App />);
    await waitForElement(() => component.getByText('logout'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(3);

    expect(component.container).toHaveTextContent('blog post #1');
    expect(component.container).toHaveTextContent('blog post #2');
    expect(component.container).toHaveTextContent('blog post #3');
  });
});

const loginMock = () => {
  const user = {
    username: 'tester',
    token: '445646',
    name: 'Bengt Bengtsson'
  };

  localStorage.setItem('loggedInUser', JSON.stringify(user));
};