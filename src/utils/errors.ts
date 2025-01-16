export class ArticleNotFoundError extends Error {
    constructor(articleId: string) {
      super(`Article with ID ${articleId} not found`);
      this.name = 'ArticleNotFoundError';
    }
  }