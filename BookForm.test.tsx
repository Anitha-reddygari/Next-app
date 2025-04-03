import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookForm from '../page';


describe('BookForm Component', () => {
  test('validates form inputs and adds a book', () => {
    render(<BookForm />);

    // Check if the form inputs are rendered
    const titleInput = screen.getByPlaceholderText('Title');
    const yearInput = screen.getByPlaceholderText('Year');
    const genreInput = screen.getByPlaceholderText('Genre');
    const priceInput = screen.getByPlaceholderText('Price');
    const addButton = screen.getByText('Add Book');

    expect(titleInput).toBeInTheDocument();
    expect(yearInput).toBeInTheDocument();
    expect(genreInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(yearInput, { target: { value: '2023' } });
    fireEvent.change(genreInput, { target: { value: 'Fiction' } });
    fireEvent.change(priceInput, { target: { value: '20' } });

    // Submit the form
    fireEvent.click(addButton);

    // Check if the book is added to the list
    const savedBook = screen.getByText('Test Book - 2023 - Fiction - $20');
    expect(savedBook).toBeInTheDocument();
  });

  test('does not add a book if form inputs are empty', () => {
    render(<BookForm />);

    const addButton = screen.getByText('Add Book');

    // Submit the form without filling inputs
    fireEvent.click(addButton);

    // Check that no book is added
    const savedBooksList = screen.queryByRole('list');
    expect(savedBooksList).toBeEmptyDOMElement();
  });
});

function expect(titleInput: any) {
  throw new Error('Function not implemented.');
}
