const express = require('express');
const cors = require('cors');
const airoutes = require('./routes/airoutes');

const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'https://devmate-code-reviewer.onrender.com', // Vite dev server
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api', airoutes);

module.exports = app;
