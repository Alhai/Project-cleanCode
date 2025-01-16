import { ArticleCreateDTO, CommentCreateDTO } from '../types/dtos';

export const validateArticleInput = (data: ArticleCreateDTO): string | null => {
  if (!data.title?.trim()) return 'Title is required';
  if (!data.content?.trim()) return 'Content is required';
  if (!data.author?.trim()) return 'Author is required';
  return null;
};

export const validateCommentInput = (data: CommentCreateDTO): string | null => {
  if (!data.content?.trim()) return 'Comment content is required';
  if (!data.author?.trim()) return 'Comment author is required';
  return null;
};