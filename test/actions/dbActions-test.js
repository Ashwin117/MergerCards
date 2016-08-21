'use strict';

const rewire = require('rewire');
const mongoose = require('mongoose');
const dbActions = rewire('../../actions/dbActions');
const sinon = require('sinon');
const expect = require('chai').expect;

describe('DB Actions', () => {
	describe('Get deckList by user', () => {
		let req;
		let dbMock;
		beforeEach(() => {
			req = {
				params: {
					username: 'Spartan117'
				},
				query: {}
			}
			dbMock = {
				collections: {
					users: {
						findOne: () => {}
					}
				}
			}
		});
		it('Should throw an error if query returns with error', (done) => {
			const db = dbActions.__get__('db');
			dbMock.collections.users.findOne = sinon.stub(dbMock.collections.users, 'findOne');
			dbMock.collections.users.findOne.callsArgWith(2, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.getDeckListEndPointByUser(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			});
		});
		it('Should throw an error if query returns with null document', (done) => {
			const db = dbActions.__get__('db');
			dbMock.collections.users.findOne = sinon.stub(dbMock.collections.users, 'findOne');
			dbMock.collections.users.findOne.callsArgWith(2, null, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.getDeckListEndPointByUser(req)
			.catch((err) => {
				expect(err).to.equal(404);
				dbActions.__set__({ 'db': db });
				done();
			});
		});
		it('Should throw an error if query returns with empty document', (done) => {
			const db = dbActions.__get__('db');
			dbMock.collections.users.findOne = sinon.stub(dbMock.collections.users, 'findOne');
			dbMock.collections.users.findOne.callsArgWith(2, null, {});
			dbActions.__set__({ 'db': dbMock });
			dbActions.getDeckListEndPointByUser(req)
			.catch((err) => {
				expect(err).to.equal(404);
				dbActions.__set__({ 'db': db });
				done();
			});
		});
		it('Should return a document', (done) => {
			req.query.nextpagetoken = '6';
			const db = dbActions.__get__('db');
			dbMock.collections.users.findOne = sinon.stub(dbMock.collections.users, 'findOne');
			dbMock.collections.users.findOne.callsArgWith(2, null, {
				decks: [1, 2, 3]
			});
			dbActions.__set__({ 'db': dbMock });
			dbActions.getDeckListEndPointByUser(req)
			.then((result) => {
				expect(result).to.deep.equal({ decks: [ 1, 2, 3 ], nextPageToken: '7' });
				dbActions.__set__({ 'db': db });
				done();
			});
		});
		it('Should return a document with empty nextPageToken', (done) => {
			req.query.nextpagetoken = '6';
			const db = dbActions.__get__('db');
			dbMock.collections.users.findOne = sinon.stub(dbMock.collections.users, 'findOne');
			dbMock.collections.users.findOne.callsArgWith(2, null, {
				decks: [1]
			});
			dbActions.__set__({ 'db': dbMock });
			dbActions.getDeckListEndPointByUser(req)
			.then((result) => {
				expect(result).to.deep.equal({ decks: [1], nextPageToken: '' });
				dbActions.__set__({ 'db': db });
				done();
			});
		});
	});
	describe('Get specified deck', () => {
		let req;
		let dbMock;
		beforeEach(() => {
			req = {
				params: {
					id: '117'
				},
				query: {}
			}
			dbMock = {
				collections: {
					decks: {
						findOne: () => {}
					}
				}
			}
		});
		it('Should throw an error if query returns with error', (done) => {
			const db = dbActions.__get__('db');
			dbMock.collections.decks.findOne = sinon.stub(dbMock.collections.decks, 'findOne');
			dbMock.collections.decks.findOne.callsArgWith(1, 302, null);
			dbActions.__set__({ 'db': dbMock });
			dbActions.getSpecifiedDeckEndPoint(req)
			.catch((err) => {
				expect(err).to.equal(302);
				dbActions.__set__({ 'db': db });
				done();
			});
		});
		it('Should return a document', (done) => {
			const db = dbActions.__get__('db');
			dbMock.collections.decks.findOne = sinon.stub(dbMock.collections.decks, 'findOne');
			dbMock.collections.decks.findOne.callsArgWith(1, null, {
				cards: [1, 2, 3]
			});
			dbActions.__set__({ 'db': dbMock });
			dbActions.getSpecifiedDeckEndPoint(req)
			.then((result) => {
				expect(result).to.deep.equal({ cards: [ 1, 2, 3 ]});
				dbActions.__set__({ 'db': db });
				done();
			});
		});
		it('Should return a document with injectedId', (done) => {
			const db = dbActions.__get__('db');
			dbMock.collections.decks.findOne = sinon.stub(dbMock.collections.decks, 'findOne');
			dbMock.collections.decks.findOne.callsArgWith(1, null, {
				cards: [1, 2, 3]
			});
			dbActions.__set__({ 'db': dbMock });
			dbActions.getSpecifiedDeckEndPoint(req, {}, 4)
			.then((result) => {
				expect(result).to.deep.equal({ cards: [ 1, 2, 3 ]});
				dbActions.__set__({ 'db': db });
				done();
			});
		});
	});
});