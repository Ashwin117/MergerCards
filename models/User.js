'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: String,
	decks: [],
	id: String,
	nextPageToken: String,
	resultSizeEstimate: Number 
});

const User = mongoose.model('User', userSchema);

module.exports = {
	model: User,
	schema: userSchema
}