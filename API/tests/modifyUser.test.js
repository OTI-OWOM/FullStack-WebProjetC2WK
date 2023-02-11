/* eslint-disable no-undef */
// tests/modifyUser.test.js

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const User = require('../models/user');

chai.use(sinonChai);
const { expect } = chai;

const { modifyUser } = require('../controllers/user');

describe('modifyUser()', () => {
    it('1. should return an error if the user does not exist', async () => {
        sandbox = sinon.createSandbox();
        mockObj = sandbox.stub(User, 'findOne').returns(null);

        // Stub the User.findOne() method to return null
        // sinon.stub(User, 'findOne').returns(null);

        // Call modifyUser() with a non-existing user ID
        const req = {
            auth: { userId: '5e86809283e28b96d2d38537', isAdmin: false },
            params: { userId: '5e86809283e28b96d2d38538' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy(),
        };
        await modifyUser(req, res);

        // Assert that the response has the correct status code and message
        expect(res.status).to.have.been.calledWith(404);
        expect(res.send).to.have.been.calledWith('User not found');
        sandbox.restore();
    });

    it('2. should return an error if the authenticated user is not authorized to modify the user', async () => {
        // Stub the User.findOne() method to return a user object
        mockObj = sandbox.stub(User, 'findOne').returns({});

        // Call modifyUser() with a user ID that is different from the authenticated user's ID,
        // and with a user that is not an admin
        const req = {
            auth: { userId: '5e86809283e28b96d2d38537', isAdmin: false },
            params: { userId: '5e86809283e28b96d2d38538' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy(),
        };
        await modifyUser(req, res);

        // Assert that the response has the correct status code and message
        expect(res.status).to.have.been.calledWith(401);
        expect(res.send).to.have.been.calledWith('You do not have authorization to modify this user');
        sandbox.restore();
    });

    it('3. should update the user with the new data if the authenticated user is authorized', async () => {
        // Stub the User.findOne() method to return a user object
        mockObj = sandbox.stub(User, 'findOne').returns({});

        // Stub the User.updateOne() method to return a promise that resolves to a result
        // indicating that the user has been successfully updated
        mockObj = sandbox.stub(User, 'updateOne').returns(Promise.resolve({ n: 1, nModified: 1, ok: 1 }));

        // Call modifyUser() with a user ID that is the same as the authenticated user's ID,
        // and with a user that is not an admin
        const req = {
            auth: { userId: '5e86809283e28b96d2d38537', isAdmin: false },
            params: { userId: '5e86809283e28b96d2d38537' },
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy(),
        };
        await modifyUser(req, res);

        // Assert that the response has the correct status code and message
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({ message: 'User modified !' });
        sandbox.restore();
    });
});
