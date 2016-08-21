'use strict';

const constants = require('./constants');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCombine');
const db = mongoose.connection;

const getDeckListEndPointByUser = (req, res) => {
	const pageToken = parseInt(req.query.nextpagetoken || constants.PAGE_LIMIT);
	const pagination = pageToken <= constants.PAGE_LIMIT ? constants.PAGE_LIMIT : pageToken;
	return new Promise((resolve, reject) => {
		db.collections.users.findOne({ userName: req.params.username }, 
			{ decks: {$slice: [pagination-constants.PAGE_LIMIT, constants.PAGE_LIMIT]} }, (err, result) => {
			if (err || !result || result.length === 0) {
				reject(err || 404);
				return;
			}
			result.nextPageToken = (result.decks.length === 1) ? '' : (pagination + 1).toString();
			resolve(result);
		});
	})
}

const getSpecifiedDeckEndPoint = (req, res, injectedId) => {
	return new Promise((resolve, reject) => {
		db.collections.decks.findOne({id: req.params.id || injectedId}, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});
}

const getPagedUserDecks = (req, res) => {
	return new Promise((resolve, reject) => {
		getDeckListEndPointByUser(req, res)
		.then(result => {
			let promiseDecks = [];
			result.decks.forEach((value) => {
				promiseDecks.push(getSpecifiedDeckEndPoint(req, res, value.id))
			});
			resolve([result, promiseDecks])
		});
	});
}

const resolveCombinedDecks = (doc, promiseDecks) => {
	return Promise.all(promiseDecks)
	.then(result => {
		result.forEach(value => {
			if (value) {
				for (let key in doc.decks) {
					if (doc.decks[key].id === value.id) {
						doc.decks[key] = value;
					}
				}
			}
		});
		return doc;
	})
}

module.exports = {
	getDeckListEndPointByUser,
	getSpecifiedDeckEndPoint,
	getPagedUserDecks,
	resolveCombinedDecks
}
