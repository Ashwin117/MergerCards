'use strict';

const seedData = require('../actions/seedData');

const setUp = (req, res) => {
	Promise.all([seedData.setUpDeck(), seedData.setUpUser()])
	.then(result => {
		res.json(result);
	})
	.catch(err => {
		res.send(err);
	})
};

module.exports = {
	setUp
}