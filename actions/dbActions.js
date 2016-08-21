'use strict';

const constants = require('./constants');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCombine');
let db = mongoose.connection;
const responseHandler = require('../controllers/responseHandler');

const getDeckListEndPointByUser = (req, res) => {
	const pageToken = parseInt(req.query.nextpagetoken || constants.PAGE_LIMIT);
	const pagination = pageToken <= constants.PAGE_LIMIT ? constants.PAGE_LIMIT : pageToken;
	
	return new Promise((resolve, reject) => {
		db.collections.users.findOne({ userName: req.params.username }, 
			{ decks: {$slice: [pagination-constants.PAGE_LIMIT, constants.PAGE_LIMIT]} }, (err, result) => {
			if (err || !result || !result.decks) {
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
		db.collections.decks.findOne({id: injectedId || req.params.id}, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});
}

const getPagedUserDocumentAndDecks = (req, res) => {
	return new Promise((resolve, reject) => {
		getDeckListEndPointByUser(req, res)
		.then(result => {
			let promiseDecks = [];
			result.decks.forEach((value) => {
				promiseDecks.push(getSpecifiedDeckEndPoint(req, res, value.id))
			});
			resolve([result, promiseDecks])
		})
		.catch(responseHandler.handleError(res))
	});
}

module.exports = {
	getDeckListEndPointByUser,
	getSpecifiedDeckEndPoint,
	getPagedUserDocumentAndDecks
}
