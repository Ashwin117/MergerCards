'use strict';

const dbActions = require('../actions/dbActions');
const docActions = require('../actions/docActions');

const getDecksByUsername = (req, res) => {
	dbActions.getDeckListEndPointByUser(req, res)
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		res.send(err);
	})
}

const getCombinedDecksByUsername = (req, res) => {
	dbActions.getPagedUserDocumentAndDecks(req, res)
	.then(docActions.resolveDecksWithDocument())
	.then(docActions.combineDecksWithDocument())
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		res.send(err);
	})
}

module.exports = {
	getDecksByUsername,
	getCombinedDecksByUsername
}