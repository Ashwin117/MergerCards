'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const seedData = require('./actions/seedData');

const app = express();
const PORT = 8080;

mongoose.connect('mongodb://localhost/cardCombine');

app.use(morgan('combined'));
app.use(bodyParser());

app.listen(PORT, () => {
	console.log(`Listening on port:${PORT}`);
});

app.get('/', (req, res) => {
	Promise.all([seedData.setUpDeck(), seedData.setUpUser()])
	.then(values => {
		res.json(values);
	})
	.catch(err => {
		res.send(err);
	})
});
