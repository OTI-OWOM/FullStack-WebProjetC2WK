/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getCurrentUser } = require('../controllers/user');

const db = require('../../../db/models');
const User = db.User;

describe('getCurrentUser', () => {
    let sandbox;
    let req, res;


    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { auth: { userId: 1 } };
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return user data excluding password and status 200', async () => {
        const userData = { id: 1, Name: 'John Doe', Email: 'john@example.com' };
        sandbox.stub(User, 'findByPk').resolves(userData);

        await getCurrentUser(req, res);

        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(userData)).to.be.true;
    });

    it('should return status 500 on database error', async () => {
        const error = new Error('Database error');
        sandbox.stub(User, 'findByPk').rejects(error);

        await getCurrentUser(req, res);

        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});
