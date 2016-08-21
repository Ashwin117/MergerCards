'use strict';

const dbActions = require('../actions/dbActions');
const responseHandler = require('./responseHandler');

const getDeckById = (req, res) => {
	dbActions.getSpecifiedDeckEndPoint(req, res)
	.then(responseHandler.handleSuccess(res))
	.catch(responseHandler.handleError(res))
}

module.exports = {
	getDeckById
}
