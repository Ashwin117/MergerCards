'use strict';

const constants = require('./constants');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCombine');
const db = mongoose.connection;

module.exports = {
	getDeckListEndPointByUser(req, res) {
		return new Promise((resolve, reject) => {
			db.collections.users.aggregate([
			    { $match: {'userName': 'test@example'}},
			    { $project: {
			    	decks: { $filter: {
			        	input: '$decks',
			        	as: 'deck',
			        	cond: {$lte: ['$$deck.id', constants.PAGE_LIMIT-1]}
			        }}
			    }}],
				(err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				result[0].nextPageToken = result[0].decks.length < constants.PAGE_LIMIT ? result[0].decks.length+1 : constants.PAGE_LIMIT;
				result[0].resultSizeEstimate = result[0].decks.length + constants.PAGE_LIMIT;
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
