'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const setUpController = require('./controllers/setUpController');
const decksController = require('./controllers/decksController');
const usersController = require('./controllers/usersController');

const app = express();
const PORT = 8080;

app.use(morgan('combined'));
app.use(bodyParser());

app.listen(PORT, () => {
	console.log(`Listening on port:${PORT}`);
});

app.get('/', setUpController.setUp);

app.get('/users/:username/decks', usersController.getDecksByUsername);

app.get('/decks/:id', decksController.getDeckById);

app.get('/users/:username/combinedecks', usersController.getCombinedDecksByUsername);
