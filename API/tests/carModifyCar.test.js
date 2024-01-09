/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { modifyCar  } = require('../controllers/car');

const db = require('../db/models');
const Car = db.Car;

describe('modifyCar', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: {}, body: {}, auth: { userId: 1 } }; // Mock request object
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() }; // Mock response object
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should modify an existing car and return status 200', async () => {
        const carId = 1;
        const carUpdate = { Price: 32000 };
        req.params.carId = carId;
        req.body = carUpdate;
        const fakeCar = { update: sinon.stub().resolves() };
        sandbox.stub(Car, 'findByPk').resolves(fakeCar);

        await modifyCar(req, res);

        sinon.assert.calledWithExactly(Car.findByPk, carId);
        sinon.assert.calledWithExactly(fakeCar.update, carUpdate);
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith({ message: 'car modified!' })).to.be.true;
    });

    it('should return a 404 error if the car is not found', async () => {
        const carId = 2;
        req.params.carId = carId;
        sandbox.stub(Car, 'findByPk').resolves(null);

        await modifyCar(req, res);

        sinon.assert.calledWithExactly(res.status, 404);
        expect(res.json.calledOnceWith({ message: 'Car not found !' })).to.be.true;
    });

    it('should return status 400 on a database error during modification', async () => {
        const carId = 3;
        const carUpdate = { Price: 33000 };
        req.params.carId = carId;
        req.body = carUpdate;
        const fakeCar = { update: sinon.stub().rejects(new Error('Database error')) };
        sandbox.stub(Car, 'findByPk').resolves(fakeCar);

        await modifyCar(req, res);

        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.json.calledOnce).to.be.true;
    });
});