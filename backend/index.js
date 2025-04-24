import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api', userRoutes);

app.get('/api/test', (req, res) => res.json({ message: 'API is working' }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

