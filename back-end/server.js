require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const userController = require('./controller/userController');

app.use('/', userController);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
