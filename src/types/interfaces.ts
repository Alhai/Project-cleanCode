import { Document } from 'mongoose';

export interface IComment {
  author: string;
  content: string;
  createdAt: Date;
}

