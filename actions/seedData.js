'use strict'

const Card = require('../models/Card');
const Deck = require('../models/Deck');
const User = require('../models/User');
const constants = require('./constants');

let decksLength;

const generateCards = () => {
	const generatedCards = [];
	const rand = Math.floor(Math.random() * constants.TOTAL) + 1;
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
	const rand = Math.floor(Math.random() * constants.TOTAL) + 1;
	const indexes = generateRandomIndexes(rand);

	indexes.forEach((value) => {
		generatedDecks.push({
			desc: 'deck' + value,
			id: value
		});
	});
	decksLength = generatedDecks.length;
	return generatedDecks;
}

function generateRandomIndexes(rand) {
	const indexes = [];
	for (let i=1; i<=rand; i++) {
		indexes.push(i);
	}
	shuffleArray(indexes);
	return indexes;
}

function shuffleArray(array) {
    let rand, temp;
    for (let i = array.length; i; i--) {
        rand = Math.floor(Math.random() * i);
        temp = array[i - 1];
        array[i - 1] = array[rand];
        array[rand] = temp;
    }
}

const starterDeck = {
	cards: generateCards(),
	desc: 'desc1',
	id: 1
}

const starterUserDecks = {
	userName: 'test@example',
	decks: generateDecks(),
	nextPageToken: decksLength < 5 ? 0 : constants.PAGE_LIMIT,
	resultSizeEstimate: decksLength
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
