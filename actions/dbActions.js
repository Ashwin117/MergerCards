'use strict';

const constants = require('./constants');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCombine');
const db = mongoose.connection;

module.exports = {
	getDeckListEndPointByUser(req, res) {
		const pageToken = parseInt(req.query.nextpagetoken || constants.PAGE_LIMIT);
		const pagination = pageToken <= constants.PAGE_LIMIT ? constants.PAGE_LIMIT : pageToken;
		return new Promise((resolve, reject) => {
			db.collections.users.findOne({ userName: 'test@example' }, 
				{ decks: {$slice: [pagination-constants.PAGE_LIMIT, constants.PAGE_LIMIT]} }, (err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				result.nextPageToken = (result.decks.length === 1) ? '' : (pagination + 1).toString();
				resolve(result);
			});
		})
	},
	getSpecifiedDeckEndPoint(req, res) {
		return new Promise((resolve, reject) => {
			db.collections.decks.findOne({id: req.params.id}, (err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				resolve(result);
			});
		});
	}
}
