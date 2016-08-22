'use strict';

const responseHandler = require('../../controllers/responseHandler');
const expect = require('chai').expect;

describe('Response Handler', () => {
	let bag;
	let res = {
		json: (doc) => {
			bag = doc;
		},
		send: (doc) => {
			bag = doc;
		}
	}
	it('Success', () => {
		const handleSuccess = responseHandler.handleSuccess(res);
		handleSuccess({ foo: 'bar'});
		expect(bag).to.deep.equal({ foo: 'bar'});
	});
	it('Error', () => {
		const handleError = responseHandler.handleError(res);
		handleError(500);
		expect(bag).to.equal(500);
	});
});
