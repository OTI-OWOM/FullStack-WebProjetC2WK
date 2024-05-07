/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/user');

const db = require('../../../db/models');
const User = db.User;

describe('login', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {};
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
        process.env.TOKEN_SECRET = 'test_secret';
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return 401 if user is not found', async () => {
        req.body = { Email: 'nonexistent@example.com', Password: 'password123' };
        sandbox.stub(User, 'findOne').resolves(null);

        await login(req, res);

        sinon.assert.calledWithExactly(res.status, 401);
        expect(res.json.calledOnceWith({ message: 'Login or password incorrect.' })).to.be.true;
    });

    it('should return 401 if password is incorrect', async () => {
        req.body = { Email: 'user@example.com', Password: 'wrongpassword' };
        const user = { Email: 'user@example.com', Password: 'hashed_password' };
        sandbox.stub(User, 'findOne').resolves(user);
        sandbox.stub(bcrypt, 'compare').resolves(false);

        await login(req, res);

        sinon.assert.calledWithExactly(res.status, 401);
        expect(res.json.calledOnceWith({ message: 'Login or password incorrect.' })).to.be.true;
    });

    it('should return 200 and a token for successful login', async () => {
        req.body = { Email: 'user@example.com', Password: 'correctpassword' };
        const user = { id: 1, Email: 'user@example.com', Password: 'hashed_password' };
        sandbox.stub(User, 'findOne').resolves(user);
        sandbox.stub(bcrypt, 'compare').resolves(true);
        sandbox.stub(jwt, 'sign').returns('token');

        await login(req, res);

        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.getCall(0).args[0]).to.have.property('token');
    });

    // Add tests for error handling (500 and 502 statuses) similarly
});
