'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const seedData = require('./actions/seedData');
const dbActions = require('./actions/dbActions');

const app = express();
const PORT = 8080;

app.use(morgan('combined'));
app.use(bodyParser());

app.listen(PORT, () => {
	console.log(`Listening on port:${PORT}`);
});

app.get('/', (req, res) => {
	Promise.all([seedData.setUpDeck(), seedData.setUpUser()])
	.then(result => {
		res.json(result);
	})
	.catch(err => {
		res.send(err);
	})
});

app.get('/users/:username/decks', (req, res) => {
	dbActions.getDeckListEndPointByUser(req, res)
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		res.send(err);
	})
});

app.get('/decks/:id', (req, res) => {
	dbActions.getSpecifiedDeckEndPoint(req, res)
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		res.send(err);
	})
});

app.get('/users/:username/combinedecks', (req, res) => {
	dbActions.getPagedUserDecks(req, res)
	.then(dbActions.resolveCombinedDecks())
	.then(result => {
		debugger;
		res.json(result);
	})
	.catch((err) => {
		res.send(err);
	})
});
