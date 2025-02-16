require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Connect to MongoDB 
mongoose .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, }) .then(() => console.log("MongoDB Connected")) .catch((err) => console.error("MongoDB Connection Error:", err));

// Test Route
app.get('/', (req, res) => {
    res.send('MERN Server is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
