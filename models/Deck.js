'use strict';

const Card = require('./Card');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
	cards: [Card.schema],
	desc: String,
	id: Number
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = {
	model: Deck,
	schema: deckSchema
}