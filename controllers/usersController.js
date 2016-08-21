'use strict';

const dbActions = require('../actions/dbActions');
const docActions = require('../actions/docActions');
const responseHandler = require('./responseHandler');

const getDecksByUsername = (req, res) => {
	dbActions.getDeckListEndPointByUser(req, res)
	.then(responseHandler.handleSuccess(res))
	.catch(responseHandler.handleError(res))
}

const getCombinedDecksByUsername = (req, res) => {
	dbActions.getPagedUserDocumentAndDecks(req, res)
	.then(docActions.resolveDecksWithDocument())
	.then(docActions.combineDecksWithDocument())
	.then(responseHandler.handleSuccess(res))
	.catch(responseHandler.handleError(res))
}

module.exports = {
	getDecksByUsername,
	getCombinedDecksByUsername
}