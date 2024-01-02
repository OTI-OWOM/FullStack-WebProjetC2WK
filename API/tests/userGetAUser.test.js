/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getOneUser } = require('../controllers/user');

const db = require('../db/models');
const User = db.User;

describe('getOneUser', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: { userId: 1 } };
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return user data excluding password and status 200 for valid user ID', async () => {
        const userData = { id: 1, Name: 'John Doe', Email: 'john@example.com' };
        sandbox.stub(User, 'findByPk').resolves(userData);

        await getOneUser(req, res);

        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(userData)).to.be.true;
    });

    it('should return status 500 on database error', async () => {
        const error = new Error('Database error');
        sandbox.stub(User, 'findByPk').rejects(error);

        await getOneUser(req, res);

        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});
