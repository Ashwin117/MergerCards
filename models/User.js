'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	decks: [],
	id: Number,
	nextPageToken: Number,
	resultSizeEstimate: Number 
});

const User = mongoose.model('User', userSchema);

module.exports = {
	model: User,
	schema: userSchema
}