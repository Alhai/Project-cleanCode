import articleRoutes from './routes/articleRouter';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { specs } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in the .env file');
  process.exit(1);
}
// Swagger Documentation
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      swaggerOptions: {
        url: '/swagger.json', // Chemin pour récupérer la documentation
      },
    })
  );
  
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Blog-Clean-Code Application');
});
app.use('/api/articles', articleRoutes);


  
// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
