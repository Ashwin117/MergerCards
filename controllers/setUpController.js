'use strict';

const seedData = require('../actions/seedData');
const responseHandler = require('./responseHandler');

const setUp = (req, res) => {
	Promise.all([seedData.setUpDeck(), seedData.setUpUser()])
	.then(responseHandler.handleSuccess(res))
	.catch(responseHandler.handleError(res))
};

module.exports = {
	setUp
}