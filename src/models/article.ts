import { IArticle, IComment } from '../types/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

const CommentSchema = new Schema<IComment>({
  author: { 
    type: String, 
    required: true,
    trim: true 
  },
  content: { 
    type: String, 
    required: true,
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const ArticleSchema = new Schema<IArticle>({
  title: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200 
  },
  content: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 10 
  },
  author: { 
    type: String, 
    required: true,
    trim: true 
  },
  likes: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  comments: { 
    type: [CommentSchema], 
    default: [] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

ArticleSchema.index({ title: 'text', content: 'text', author: 'text' });

const Article = mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;
