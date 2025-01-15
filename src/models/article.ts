import mongoose, { Document, Schema } from 'mongoose';

interface IComment {
  author: string;
  content: string;
  createdAt: Date;
}

interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: IComment[];
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model<IArticle>('Article', ArticleSchema);
export default Article;
