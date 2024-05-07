/* eslint-disable no-undef */

const sinon = require('sinon');
const { adminOrUserCheck  } = require('../../../middleware/authorize');

const db = require('../../../db/models');
const User = db.User;

describe('adminOrUserCheck', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: { userId: '12345' }, auth: {} };
        res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call next() for an existing user and authorized request', async () => {
        sandbox.stub(User, 'findByPk').returns(Promise.resolve({ id: '12345' })); // User exists
        req.auth = { userId: '12345', role: false }; // Authenticated as the same user

        await adminOrUserCheck(req, res, next);

        sinon.assert.calledOnce(next);
    });

    it('should send 404 for a non-existing user', async () => {
        sandbox.stub(User, 'findByPk').returns(Promise.resolve(null)); // User does not exist

        await adminOrUserCheck(req, res, next);

        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, 'User not found');
    });

    it('should send 401 for an unauthorized request', async () => {
        sandbox.stub(User, 'findByPk').returns(Promise.resolve({ id: '12345' })); // User exists
        req.auth = { userId: 'anotherUserId', role: false }; // Authenticated as a different, non-admin user

        await adminOrUserCheck(req, res, next);

        sinon.assert.calledWith(res.status, 401);
        sinon.assert.calledWith(res.send, 'Unauthorized');
    });
});
