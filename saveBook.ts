import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const book = req.body;

    // Simulate saving the book (e.g., log it or store it in memory)
    console.log('Book received:', book);

    // Respond with success
    res.status(200).json({ message: 'Book saved successfully', book });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}