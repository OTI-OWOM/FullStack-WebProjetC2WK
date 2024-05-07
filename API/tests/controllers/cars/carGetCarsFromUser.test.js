/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getAllcarsFromUser  } = require('../controllers/car');
const formatHelper = require('../../../helpers/formatHelper');

const db = require('../../../db/models');
const Car = db.Car;

describe('getAllcarsFromUser', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        // Create a sandbox for stubbing methods
        sandbox = sinon.createSandbox();

        // Mock request and response objects
        req = { params: { userId: 1 } };
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        // Restore the default sandbox state
        sandbox.restore();
    });

    it('should return all cars for the specified user with status 200', async () => {
        // Arrange
        const user1Id = 1;
        const user2Id = 2;
        const carsUser1 = [{ id: 1, Year: 2020, Price: 30000, Description: 'Car 1', Available: true, SellerID: user1Id }];
        const carsUser2 = [{ id: 2, Year: 2019, Price: 25000, Description: 'Car 2', Available: true, SellerID: user2Id }];
    
        // Create stubs for different users
        sandbox.stub(Car, 'findAll')
            .withArgs({ where: { SellerID: user1Id } }).resolves(carsUser1)
            .withArgs({ where: { SellerID: user2Id } }).resolves(carsUser2);
    
        sandbox.stub(formatHelper, 'carFormat').callsFake(car => Promise.resolve(car)); // Simplified for the test
    
        // Act & Assert for User 1
        req.params.userId = user1Id;
        await getAllcarsFromUser(req, res);
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(carsUser1)).to.be.true;
        res.status.resetHistory(); // Reset the history for the next assertion
        res.json.resetHistory();
    
        // Act & Assert for User 2
        req.params.userId = user2Id;
        await getAllcarsFromUser(req, res);
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(carsUser2)).to.be.true;
    });

    it('should return status 400 on database error', async () => {
        // Arrange
        const error = new Error('Database error');
        sandbox.stub(Car, 'findAll').rejects(error);

        // Act
        await getAllcarsFromUser(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});