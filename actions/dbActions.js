'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cardCombine');
const db = mongoose.connection;

module.exports = {
	getDeckListEndPointByUser(req, res) {
		return new Promise((req, res) => {
			db.collections.users.findOne({userName: req.params.username}, (err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				resolve(result);
			});
		})
	},
	getSpecifiedDeckEndPoint(req, res) {
		return new Promise((req, res) => {
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
