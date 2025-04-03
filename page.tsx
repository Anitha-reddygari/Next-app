'use client'
import React, { useState, useEffect } from 'react';

const BookForm = () => {
  const [formData, setFormData] = useState({
    Title: '',
    Year: '',
    Genre: '',
    Price: '',
  });

  const [books, setBooks] = useState<{ id: number; Title: string; Year: string; Genre: string; Price: string }[]>([]);
  const [idCounter, setIdCounter] = useState(1);

  // Fetch mock data from JSONPlaceholder
  const fetchSavedBooks = async () => {
    const mockData = [
      { id: 1, Title: 'Book One', Year: '2021', Genre: 'Fiction', Price: '10' },
      { id: 2, Title: 'Book Two', Year: '2022', Genre: 'Non-Fiction', Price: '15' },
    ];

    // Simulate API call using JSONPlaceholder
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.ok) {
      // Use mockData for this example
      return mockData;
    } else {
      console.error('Failed to fetch data');
      return [];
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = await fetchSavedBooks();
      setBooks(savedBooks as any);
    };
    loadBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = {
      id: idCounter,
      ...formData,
    };

    try {
      const response = await fetch('/api/saveBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setBooks([...books, newBook]);
        setIdCounter(idCounter + 1);
        setFormData({ Title: '', Year: '', Genre: '', Price: '' });
      } else {
        console.error('Failed to save book');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Book Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Title"
          placeholder="Title"
          value={formData.Title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Year"
          placeholder="Year"
          value={formData.Year}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Genre"
          placeholder="Genre"
          value={formData.Genre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Price"
          placeholder="Price"
          value={formData.Price}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
      <SavedBooks books={books} />
    </div>
  );
};

const SavedBooks = ({ books }: { books: { id: number; Title: string; Year: string; Genre: string; Price: string }[] }) => {
  return (
    <div>
      <h2>Saved Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.Title} - {book.Year} - {book.Genre} - ${book.Price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookForm;