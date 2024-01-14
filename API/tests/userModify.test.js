/* eslint-disable no-undef */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const db = require('../db/models');
const User = db.User;

chai.use(sinonChai);
const { expect } = chai;

const { modifyUser } = require('../controllers/user');

describe('modifyUser()', () => {
    beforeEach(() => {
        // Create a new sandbox before each test
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        // Restore the sandbox after each test
        sandbox.restore();
    });
    it('3. should update the user with the new data if the authenticated user is authorized', async () => {
        // Stub the User.findOne() method to return a user object
        mockObj = sandbox.stub(User, 'findOne').returns({});

        // Stub the User.updateOne() method to return a promise that resolves to a result
        // indicating that the user has been successfully updated
        sandbox.stub(User, 'update').returns(Promise.resolve([1]));

        // Call modifyUser() with a user ID that is the same as the authenticated user's ID,
        // and with a user that is not an admin
        const req = {
            auth: { userId: '5e86809283e28b96d2d38537', role: false },
            params: { userId: '5e86809283e28b96d2d38537' },
            body: {
                Name: 'John Doe',
                Email: 'john.doe@example.com',
            },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
            json: sinon.spy(),
        };
        await modifyUser(req, res);

        // Assert that the response has the correct status code and message
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith({ message: 'User modified!' });
    });
});
