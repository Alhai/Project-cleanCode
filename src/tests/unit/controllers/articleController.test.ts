import { Document, Types } from 'mongoose';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { Request, Response } from 'express';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ArticleController } from '../../../controllers/articleController';
import { ArticleService } from '../../../services/articleService';
import { IArticle } from '../../../models/article';

interface SearchQuery extends Query {
  query?: string;
}

interface CreateArticleBody {
  title: string;
  content: string;
  author: string;
}

interface CommentBody {
  author: string;
  content: string;
}

interface ArticleParams extends ParamsDictionary {
  id: string;
}

type MongooseArticle = Document<unknown, {}, IArticle> &
  IArticle &
  Required<{ _id: unknown }> &
{ __v: number };

jest.mock('../../../services/articleService');

describe('ArticleController', () => {
  let articleController: ArticleController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockArticleService: jest.Mocked<ArticleService>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockArticleService = {
      createArticle: jest.fn(),
      getAllArticles: jest.fn(),
      addCommentToArticle: jest.fn(),
      likeArticle: jest.fn(),
      searchArticles: jest.fn(),
    } as any;

    articleController = new ArticleController();
    (articleController as any).articleService = mockArticleService;

    mockRes = {
      status: jest.fn().mockReturnThis() as unknown as Response['status'],
      json: jest.fn().mockReturnThis() as unknown as Response['json'],
    } as Partial<Response>;
    mockReq = {
      params: {},
      query: {},
      body: {},
    };
  });

  describe('createArticle', () => {
    it('should create an article successfully', async () => {
      const mockArticle: Partial<MongooseArticle> = {
        _id: new Types.ObjectId(),
        title: 'Test Article',
        content: 'Test Content',
        author: 'Test Author',
        __v: 0
      };

      mockReq.body = mockArticle;
      mockArticleService.createArticle.mockResolvedValue(mockArticle as MongooseArticle);

      await articleController.createArticle(
        mockReq as Request<{}, any, CreateArticleBody>,
        mockRes as Response
      );

      expect(mockArticleService.createArticle).toHaveBeenCalledWith(
        mockArticle.title,
        mockArticle.content,
        mockArticle.author
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockArticle);
    });
  });

  describe('addComment', () => {
    it('should add comment successfully', async () => {
      const articleId = new Types.ObjectId().toString();
      const commentData: CommentBody = {
        author: 'Commenter',
        content: 'Test Comment'
      };

      const mockArticleWithComment: Partial<MongooseArticle> = {
        _id: new Types.ObjectId(articleId),
        comments: [{ ...commentData, createdAt: new Date() }],
        __v: 0
      };

      mockReq.params = { id: articleId };
      mockReq.body = commentData;
      mockArticleService.addCommentToArticle.mockResolvedValue(
        mockArticleWithComment as MongooseArticle
      );

      await articleController.addComment(
        mockReq as Request<ArticleParams, any, CommentBody>,
        mockRes as Response
      );

      expect(mockArticleService.addCommentToArticle).toHaveBeenCalledWith(
        articleId,
        commentData.author,
        commentData.content
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });

  describe('getArticles', () => {
    it('should return all articles', async () => {
      const mockArticles: Partial<MongooseArticle>[] = [{
        _id: new Types.ObjectId(),
        title: 'Test Article',
        content: 'Test Content',
        author: 'Test Author',
        __v: 0
      }];

      mockArticleService.getAllArticles.mockResolvedValue(
        mockArticles as MongooseArticle[]
      );

      await articleController.getArticles(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockArticleService.getAllArticles).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockArticles);
    });
  });

  describe('searchArticles', () => {
    it('should search articles with query', async () => {
      const query = 'test';
      const mockArticles: Partial<MongooseArticle>[] = [{
        _id: new Types.ObjectId(),
        title: 'Test Article',
        content: 'Test Content',
        author: 'Test Author',
        __v: 0
      }];

      mockReq.query = { query };
      mockArticleService.searchArticles.mockResolvedValue(
        mockArticles as MongooseArticle[]
      );

      await articleController.searchArticles(
        mockReq as Request<{}, any, any, SearchQuery>,
        mockRes as Response
      );

      expect(mockArticleService.searchArticles).toHaveBeenCalledWith(query);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockArticles);
    });

    it('should return 400 for missing query', async () => {
      mockReq.query = {};

      await articleController.searchArticles(
        mockReq as Request<{}, any, any, SearchQuery>,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });
});