'use strict';

const dbActions = require('../actions/dbActions');

const getDeckById = (req, res) => {
	dbActions.getSpecifiedDeckEndPoint(req, res)
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		res.send(err);
	})
}

module.exports = {
	getDeckById
}
