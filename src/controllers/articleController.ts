import { ArticleCreateDTO, CommentCreateDTO } from '../types/dtos';
import { Request, Response } from 'express';
import { validateArticleInput, validateCommentInput } from '../utils/validator';

import { ArticleService } from '../services/articleService';
import { handleError } from '../utils/errorHandler';

/**
 * Controller handling all article-related operations
 * Implements RESTful practices and clean separation of concerns
 */
export class ArticleController {
  private readonly articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  /**
   * Creates a new article
   * @param req Request containing article data in body
   * @param res Response object
   */
  async createArticle(req: Request, res: Response): Promise<Response> {
    try {
      const articleData: ArticleCreateDTO = req.body;
      const validationError = validateArticleInput(articleData);
      
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const article = await this.articleService.createArticle(
        articleData.title,
        articleData.content,
        articleData.author
      );

      return res.status(201).json(article);
    } catch (error) {
      return handleError(res, error, 'Failed to create article');
    }
  }

  /**
   * Adds a comment to an existing article
   * @param req Request containing comment data and article ID
   * @param res Response object
   */
  async addComment(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const commentData: CommentCreateDTO = req.body;
      
      const validationError = validateCommentInput(commentData);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const article = await this.articleService.addCommentToArticle(
        id,
        commentData.author,
        commentData.content
      );

      return res.status(201).json(article);
    } catch (error) {
      return handleError(res, error, 'Failed to add comment');
    }
  }

  /**
   * Increments the like count for an article
   * @param req Request containing article ID
   * @param res Response object
   */
  async likeArticle(req: Request<{ id: string }>, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const article = await this.articleService.likeArticle(id);
      return res.status(200).json(article);
    } catch (error) {
      return handleError(res, error, 'Failed to like article');
    }
  }

  /**
   * Retrieves all articles
   * @param _req Request object (unused)
   * @param res Response object
   */
  async getArticles(_req: Request, res: Response): Promise<Response> {
    try {
      const articles = await this.articleService.getAllArticles();
      return res.status(200).json(articles);
    } catch (error) {
      return handleError(res, error, 'Failed to fetch articles');
    }
  }

  /**
   * Searches articles based on query string
   * @param req Request containing search query
   * @param res Response object
   */
  async searchArticles(req: Request, res: Response): Promise<Response> {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          error: 'Query parameter is required and must be a string' 
        });
      }

      const articles = await this.articleService.searchArticles(query);
      return res.status(200).json(articles);
    } catch (error) {
      return handleError(res, error, 'Failed to search articles');
    }
  }
}