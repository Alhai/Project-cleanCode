import Article from '../models/article';
import { ArticleNotFoundError } from '../utils/errors';

export class ArticleService {
  /**
   * Creates a new article
   */
  async createArticle(
    title: string, 
    content: string, 
    author: string
  ) {
    const newArticle = new Article({ title, content, author });
    return await newArticle.save();
  }

  /**
   * Adds a comment to an existing article
   * @throws {ArticleNotFoundError} If article is not found
   */
  async addCommentToArticle(
    id: string, 
    author: string, 
    content: string
  ) {
    const article = await Article.findById(id);
    if (!article) {
      throw new ArticleNotFoundError(id);
    }

    article.comments.push({ author, content, createdAt: new Date() });
    return await article.save();
  }

  /**
   * Increments like count for an article
   * @throws {ArticleNotFoundError} If article is not found
   */
  async likeArticle(id: string) {
    const article = await Article.findById(id);
    if (!article) {
      throw new ArticleNotFoundError(id);
    }

    article.likes += 1;
    return await article.save();
  }

  /**
   * Retrieves all articles
   */
  async getAllArticles() {
    return await Article.find().sort({ createdAt: -1 });
  }

  /**
   * Searches articles based on query string
   */
  async searchArticles(query: string) {
    return await Article.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
  }
}