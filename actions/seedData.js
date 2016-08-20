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
	userName: 'test@example',
	decks: generateDecks(),
	nextPageToken: 2,
	resultSizeEstimate: 2
}

const generateCards = () => {
	const generatedCards = [];
	const rand = Math.floor(Math.random() * 25) + 1;
	const indexes = generateRandomIndexes(rand);

	indexes.forEach((value) => {
		generatedCards.push({
			payload: {
				data: 'data' + value
			},
			title: 'card' + value
		});
	});
	return generatedCards;
}

const generateDecks = () => {
	const generatedDecks = [];
	const rand = Math.floor(Math.random() * 25) + 1;
	const indexes = generateRandomIndexes(rand);

	indexes.forEach((value) => {
		generatedDecks.push({
			desc: 'deck' + value,
			id: value.toString()
		});
	});
	return generatedDecks;
}

function generateRandomIndexes(rand) {
	const indexes = [];
	for (let i=1; i<=rand; i++) {
		indexes.push(i);
	}
	shuffle(indexes);
	return indexes;
}

function shuffle(array) {
    let j, x;
    for (let i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
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
			debugger;
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
