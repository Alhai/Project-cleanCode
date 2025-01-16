import { ArticleNotFoundError } from './errors';
import { Response } from 'express';

export const handleError = (res: Response, error: any, message: string): Response => {
  console.error(`${message}:`, error);

  if (error instanceof ArticleNotFoundError) {
    return res.status(404).json({ 
      error: 'Article not found',
      details: error.message 
    });
  }

  return res.status(500).json({ 
    error: message,
    details: error.message 
  });
};