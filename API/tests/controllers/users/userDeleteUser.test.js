/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { deleteUser } = require('../controllers/user');

const db = require('../../../db/models');
const User = db.User;

describe('deleteUser', () => {
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

    it('should successfully delete user and return status 200', async () => {
        const userMock = { destroy: sinon.stub().resolves() };
        sandbox.stub(User, 'findByPk').resolves(userMock);

        await deleteUser(req, res);

        sinon.assert.calledOnce(userMock.destroy);
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith({ message: 'User successfully deleted.' })).to.be.true;
    });

    it('should return status 500 on deletion error', async () => {
        const userMock = { destroy: sinon.stub().rejects(new Error('Deletion error')) };
        sandbox.stub(User, 'findByPk').resolves(userMock);

        await deleteUser(req, res);

        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.json.calledOnce).to.be.true;
    });

    it('should return status 500 if user is not found', async () => {
        sandbox.stub(User, 'findByPk').rejects(new Error('User not found'));

        await deleteUser(req, res);

        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.json.calledOnce).to.be.true;
    });
});
