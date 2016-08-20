'use strict'

const Card = require('../models/Card');
const Deck = require('../models/Deck');
const User = require('../models/User');

const starterDeck = {
	cards: generateCards(),
	desc: 'desc1',
	id: '1'
}
const starterUserDecks = {
	decks: generateDecks(),
	nextPageToken: 2,
	resultSizeEstimate: 2
}

function generateCards() {
	const generatedCards = [];
	const rand = Math.floor(Math.random() * 25) + 1;
	for (let i=1; i<rand; i++) {
		generatedCards.push({
			payload: {
				data: 'data' + i
			},
			title: 'card' + i
		});
	}
	return generatedCards;
}

function generateDecks() {
	const generatedDecks = [];
	const rand = Math.floor(Math.random() * 25) + 1;
	for (let i=1; i<rand; i++) {
		generatedDecks.push({
			desc: 'deck' + i,
			id: i.toString()
		});
	}
	return generatedDecks;
}

module.exports = {
	setUpDeck() {
		return new Promise ((resolve, reject) => {
			Deck.model.create(starterDeck, (err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				resolve(result);
			});
		});
	},
	setUpUser() {
		return new Promise((resolve, reject) => {
			User.model.create(starterUserDecks, (err, result) => {
				if (err || !result || result.length === 0) {
					reject(err || 500);
					return;
				}
				resolve(result);
			});
		});
	}
}
