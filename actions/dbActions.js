'use strict';

const constants = require('./constants');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCombine');
const db = mongoose.connection;

module.exports = {
	getDeckListEndPointByUser(req, res) {
		const pagination = setPagination(req);
		const lowerLimit = pagination - (Math.floor(constants.PAGE_LIMIT/2));
		const upperLimit = pagination + (Math.ceil(constants.PAGE_LIMIT/2));
		return new Promise((resolve, reject) => {
			db.collections.users.aggregate([
			    { $match: {'userName': 'test@example'}},
			    { $project: {
			    	decks: { $filter: {
			        	input: '$decks',
			        	as: 'deck',
			        	cond: { $and: [
			        		{ $gte: ['$$deck.id', lowerLimit] },
			        		{ $lte: ['$$deck.id', upperLimit] }
			        	]}
			        }}
			    }}],
				(err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				result[0].nextPageToken = result[0].decks.length === 1 ? '' : pagination+1;
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

const setPagination = (req) => {
	if (req.query.nextpagetoken < 1) {
		return Math.ceil(constants.PAGE_LIMIT/2);
	}
	return parseInt(req.query.nextpagetoken) || Math.ceil(constants.PAGE_LIMIT/2);
}
