import { Document } from 'mongoose';

export interface IComment {
  author: string;
  content: string;
  createdAt: Date;
}

export interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: IComment[];
  createdAt: Date;
}