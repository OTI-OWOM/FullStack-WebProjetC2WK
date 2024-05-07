/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getAllUsers } = require('../controllers/user');

const db = require('../../../db/models');
const User = db.User;

describe('getAllUsers', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {};
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return all users data excluding passwords and status 200', async () => {
        const usersData = [
            { id: 1, Name: 'John Doe', Email: 'john@example.com' },
            { id: 2, Name: 'Jane Doe', Email: 'jane@example.com' }
        ];
        sandbox.stub(User, 'findAll').resolves(usersData);

        await getAllUsers(req, res);

        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(usersData)).to.be.true;
    });

    it('should return status 500 on database error', async () => {
        const error = new Error('Database error');
        sandbox.stub(User, 'findAll').rejects(error);

        await getAllUsers(req, res);

        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});
