import Article from '../models/article';

export class ArticleService {
  async createArticle(title: string, content: string, author: string) {
    const newArticle = new Article({ title, content, author });
    return await newArticle.save();
  }

  async addCommentToArticle(id: string, author: string, content: string) {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }

    article.comments.push({ author, content, createdAt: new Date() });
    return await article.save();
  }

  async likeArticle(id: string) {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }

    article.likes += 1;
    return await article.save();
  }

  async getAllArticles() {
    return await Article.find();
  }

  async searchArticles(query: string) {
    return await Article.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    });
  }
}