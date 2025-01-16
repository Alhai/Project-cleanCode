import Article from "../../../models/article";
import { ArticleService } from "../../../services/articleService";
import { Types } from 'mongoose';

jest.mock('../../../models/article');

describe('ArticleService', () => {
  let articleService: ArticleService;
  const mockArticle = jest.mocked(Article);

  beforeEach(() => {
    jest.clearAllMocks();
    articleService = new ArticleService();
  });

  describe('createArticle', () => {
    it('should create an article', async () => {
      const mockSave = jest.fn().mockResolvedValue({
        _id: new Types.ObjectId(),
        title: 'Test Article',
        content: 'Test Content',
        author: 'Test Author',
        __v: 0
      });

      mockArticle.mockImplementation(() => ({
        save: mockSave,
      } as any));

      const result = await articleService.createArticle(
        'Test Article',
        'Test Content',
        'Test Author'
      );

      expect(mockArticle).toHaveBeenCalledWith({
        title: 'Test Article',
        content: 'Test Content',
        author: 'Test Author'
      });
      expect(mockSave).toHaveBeenCalled();
      expect(result.title).toBe('Test Article');
    });
  });

  describe('addCommentToArticle', () => {
    it('should add a comment to an article', async () => {
      const mockArticleData = {
        _id: new Types.ObjectId(),
        comments: [],
        save: jest.fn().mockResolvedValue({
          comments: [{ author: 'Test', content: 'Comment', createdAt: new Date() }]
        })
      };

      mockArticle.findById = jest.fn().mockResolvedValue(mockArticleData);

      const result = await articleService.addCommentToArticle(
        mockArticleData._id.toString(),
        'Test',
        'Comment'
      );

      expect(result.comments).toHaveLength(1);
    });
  });
});