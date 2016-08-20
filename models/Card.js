'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
	id: String,
	payload: {
		data: String
	},
	title: String
});

const Card = mongoose.model('Card', cardSchema);

module.exports = {
	model: Card,
	schema: cardSchema
}