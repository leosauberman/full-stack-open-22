import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog';

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'true',
        likes: 0,
        id: 'test-id-0'
    }

    // eslint-disable-next-line no-undef
    window.localStorage.setItem('user', JSON.stringify({ id: 'test-user-id' }));

    render(<Blog blog={blog}/>)

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
})