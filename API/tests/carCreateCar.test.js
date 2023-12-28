/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { createCar  } = require('../controllers/car');

const db = require('../db/models');
const Car = db.Car;

describe('createCar', () => {
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

    it('should add a new car and return status 201', async () => {
        // Arrange
        const carObject = { Year: 2020, Price: 30000, Description: 'New Car', Available: true };
        req.body = carObject;
        req.auth = { userId: 1 }; // Mock authentication object
        sandbox.stub(Car, 'create').resolves();
    
        // Act
        await createCar(req, res);
    
        // Assert
        sinon.assert.calledWithExactly(res.status, 201);
        expect(res.json.calledOnceWith({ message: 'car added!' })).to.be.true;
    });    
    
    it('should return status 400 on a database error', async () => {
        // Arrange
        const carObject = { Year: 2020, Price: 30000, Description: 'New Car', Available: true };
        req.body = carObject;
        req.auth = { userId: 1 }; // Mock authentication object
        const error = new Error('Database error');
        sandbox.stub(Car, 'create').rejects(error);
    
        // Act
        await createCar(req, res);
    
        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});