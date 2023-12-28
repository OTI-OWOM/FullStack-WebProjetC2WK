/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getOnecar  } = require('../controllers/car');
const formatHelper = require('../helpers/formatHelper');

const db = require('../db/models');
const Car = db.Car;

describe('getOnecar', () => {
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

    it('should return the car with the specified ID with status 200', async () => {
        // Arrange
        const carId = 1;
        const fakeCar = { id: carId, Year: 2020, Price: 30000, Description: 'Car 1', Available: true, SellerID: 1 };
        req.params.carId = carId;
        sandbox.stub(Car, 'findByPk').resolves(fakeCar);
        sandbox.stub(formatHelper, 'carFormat').resolves(fakeCar); // Simplified for the test
    
        // Act
        await getOnecar(req, res);
    
        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(fakeCar)).to.be.true;
    });
    

    it('should return a 404 error if the car is not found', async () => {
        // Arrange
        const carId = 2;
        req.params.carId = carId;
        sandbox.stub(Car, 'findByPk').resolves(null);
    
        // Act
        await getOnecar(req, res);
    
        // Assert
        sinon.assert.calledWithExactly(res.status, 404);
        expect(res.json.calledOnceWith({ error: 'car not found' })).to.be.true;
    });
    
    it('should return a 404 error on a database error', async () => {
        // Arrange
        const carId = 3;
        req.params.carId = carId;
        const error = new Error('Database error');
        sandbox.stub(Car, 'findByPk').rejects(error);
    
        // Act
        await getOnecar(req, res);
    
        // Assert
        sinon.assert.calledWithExactly(res.status, 404);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });    
});