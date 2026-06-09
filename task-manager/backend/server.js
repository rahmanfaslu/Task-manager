
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
 
app.use(cors({ origin: 'http://localhost:5173' }));
 

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
 
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
 

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
