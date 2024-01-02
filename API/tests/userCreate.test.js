/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const bcrypt = require('bcrypt');
const { register } = require('../controllers/user');

const db = require('../db/models');
const User = db.User;

describe('register', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {};
        res = { status: sinon.stub().returnsThis(), json: sinon.spy(), send: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return status 400 for invalid request', async () => {
        req.body = { Email: 'test@example.com' }; // Missing Password
        await register(req, res);
        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.send.calledOnceWith('Invalid request')).to.be.true;
    });

    it('should create a user and return status 201', async () => {
        req.body = { Name: 'John Doe', Password: 'password123', Email: 'john@example.com', IsSeller: false, Role: 'user' };
        sandbox.stub(bcrypt, 'hash').resolves('hashed_password');
        sandbox.stub(User, 'create').resolves();

        await register(req, res);

        sinon.assert.calledWithExactly(res.status, 201);
        expect(res.json.calledOnceWith({ message: 'User created !' })).to.be.true;
    });

    it('should return status 400 on user creation failure', async () => {
        req.body = { Name: 'John Doe', Password: 'password123', Email: 'john@example.com', IsSeller: false, Role: 'user' };
        const error = { errors: [{ message: 'User creation error' }] };
        sandbox.stub(bcrypt, 'hash').resolves('hashed_password');
        sandbox.stub(User, 'create').rejects(error);

        await register(req, res);

        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.json.calledOnceWith({ message: error.errors[0].message })).to.be.true;
    });

    it('should return status 500 on bcrypt error', async () => {
        req.body = { Name: 'John Doe', Password: 'password123', Email: 'john@example.com', IsSeller: false, Role: 'user' };
        const error = new Error('Bcrypt error');
        sandbox.stub(bcrypt, 'hash').rejects(error);

        await register(req, res);

        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});
