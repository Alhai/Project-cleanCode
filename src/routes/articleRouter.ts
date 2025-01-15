import express, { Request, Response } from 'express';

import { ArticleController } from '../controllers/articleController';
import { ParamsDictionary } from 'express-serve-static-core';

const router = express.Router();
const articleController = new ArticleController();

interface IdParam extends ParamsDictionary {
  id: string;
}

router.post('/', (req: Request, res: Response) => {
  articleController.createArticle(req, res);
});

router.post('/:id/comments', (req: Request<IdParam>, res: Response) => {
  articleController.addComment(req, res);
});

router.post('/:id/like', (req: Request<IdParam>, res: Response) => {
  articleController.likeArticle(req, res);
});

router.get('/', (req: Request, res: Response) => {
  articleController.getArticles(req, res);
});

router.get('/search', (req: Request, res: Response) => {
  articleController.searchArticles(req, res);
});

export default router;