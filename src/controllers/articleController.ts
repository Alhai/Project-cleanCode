import { Request, Response } from 'express';

import { ArticleService } from '../services/articleService';
import { handleError } from '../utils/errorHandler';

export class ArticleController {
  private articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  async createArticle(req: Request, res: Response) {
    try {
      const { title, content, author } = req.body;
      const article = await this.articleService.createArticle(title, content, author);
      res.status(201).json(article);
    } catch (error) {
      handleError(res, error, 'Failed to create article');
    }
  }

  async addComment(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const { author, content } = req.body;
      const article = await this.articleService.addCommentToArticle(id, author, content);
      res.status(201).json(article);
    } catch (error) {
      handleError(res, error, 'Failed to add comment');
    }
  }

  async likeArticle(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;
      const article = await this.articleService.likeArticle(id);
      res.status(200).json(article);
    } catch (error) {
      handleError(res, error, 'Failed to like article');
    }
  }

  async getArticles(req: Request, res: Response) {
    try {
      const articles = await this.articleService.getAllArticles();
      res.status(200).json(articles);
    } catch (error) {
      handleError(res, error, 'Failed to fetch articles');
    }
  }

  async searchArticles(req: Request, res: Response) {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query parameter is required and must be a string' });
      }
      const articles = await this.articleService.searchArticles(query);
      res.status(200).json(articles);
    } catch (error) {
      handleError(res, error, 'Failed to search articles');
    }
  }
}
