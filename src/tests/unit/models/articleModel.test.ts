import Article from '../../../models/article';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Article Model', () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  it('should create an article successfully', async () => {
    const article = new Article({
      title: 'Test Title',
      content: 'This is a test content.',
      author: 'Author Name',
    });

    const savedArticle = await article.save();
    expect(savedArticle._id).toBeDefined();
    expect(savedArticle.title).toBe('Test Title');
    expect(savedArticle.likes).toBe(0);
  });

  it('should fail without required fields', async () => {
    const article = new Article({});
    await expect(article.save()).rejects.toThrow(/validation/);
  });

  it('should validate the title length', async () => {
    const article = new Article({
      title: 'T',
      content: 'Valid content',
      author: 'Author Name',
    });

    await expect(article.save()).rejects.toThrow(/shorter than the minimum/);
  });
});