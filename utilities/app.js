const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");
const homeRoutes = require('../routes/homeRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.use(cors());


app.use('/api/v1', homeRoutes);
module.exports = { app };