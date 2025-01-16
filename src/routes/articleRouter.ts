import express, { Request, Response } from 'express';

import { ArticleController } from '../controllers/articleController';
import { ParamsDictionary } from 'express-serve-static-core';

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the article
 *         title:
 *           type: string
 *           description: Title of the article
 *         content:
 *           type: string
 *           description: Content of the article
 *         author:
 *           type: string
 *           description: Author of the article
 *         likes:
 *           type: number
 *           description: Number of likes
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 */

const router = express.Router();
const articleController = new ArticleController();

interface IdParam extends ParamsDictionary {
  id: string;
}

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created successfully
 */
router.post('/', (req: Request, res: Response) => {
  articleController.createArticle(req, res);
});

/**
 * @swagger
 * /api/articles/{id}/comments:
 *   post:
 *     summary: Add a comment to an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 */
router.post('/:id/comments', (req: Request<IdParam>, res: Response) => {
  articleController.addComment(req, res);
});

/**
 * @swagger
 * /api/articles/{id}/like:
 *   post:
 *     summary: Like an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post('/:id/like', (req: Request<IdParam>, res: Response) => {
  articleController.likeArticle(req, res);
});

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of all articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', (req: Request, res: Response) => {
  articleController.getArticles(req, res);
});

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Search articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string
 */
router.get('/search', (req: Request, res: Response) => {
  articleController.searchArticles(req, res);
});



export default router;