/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const { jwtUserAuth } = require('../../../middleware/authorize');
const db = require('../../../db/models');
const User = db.User;

describe('jwtUserAuth', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { headers: { authorization: 'Bearer validToken' } };
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call next() when token is valid and user is not admin', async () => {
        const fakeUserId = '12345';
        sandbox.stub(jwt, 'verify').returns({ userId: fakeUserId });
        sandbox.stub(User, 'findOne').returns(Promise.resolve({ Role: false })); // Stubbing the User.findOne method

        await jwtUserAuth(req, res, next);

        expect(req.auth).to.deep.equal({ userId: fakeUserId, role: false });
        sinon.assert.calledOnce(next);
    });

    it('should call next() when token is valid and user is admin', async () => {
        const fakeUserId = '12345';
        sandbox.stub(jwt, 'verify').returns({ userId: fakeUserId });
        sandbox.stub(User, 'findOne').returns(Promise.resolve({ Role: true })); // User is an admin

        await jwtUserAuth(req, res, next);

        expect(req.auth).to.deep.equal({ userId: fakeUserId, role: true });
        sinon.assert.calledOnce(next);
    });

    it('should return 401 when token is invalid', async () => {
        sandbox.stub(jwt, 'verify').throws(new Error('Invalid token'));

        await jwtUserAuth(req, res, next);

        sinon.assert.calledWith(res.status, 401);
        sinon.assert.calledOnce(res.json);
    });

    it('should return 401 when authorization header is missing', async () => {
        delete req.headers.authorization;

        await jwtUserAuth(req, res, next);

        sinon.assert.calledWith(res.status, 401);
        sinon.assert.calledOnce(res.json);
    });
});
