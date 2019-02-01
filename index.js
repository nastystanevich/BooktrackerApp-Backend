
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.API_PORT;

mongoose.connect(process.env.DB_PATH, { useNewUrlParser: true });

app.use('/static', express.static('static'));
app.use(cors());
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`);
});
