'use strict';

const resolveDecksWithDocument = () => {
	return (result) => {
		const doc = result[0];
		const promiseDecks = result[1];
		return Promise.all(promiseDecks)
		.then(result => {
			return [doc, result]
		})
	}
}

const combineDecksWithDocument = () => {
	return (result) => {
		const doc = result[0];
		const deckList = result[1];
		deckList.forEach(value => {
			if (value) {
				for (let key in doc.decks) {
					if (doc.decks[key].id === value.id) {
						doc.decks[key] = value;
					}
				}
			}
		});
		return doc;
	}
}

module.exports = {
	resolveDecksWithDocument,
	combineDecksWithDocument
}
