/* eslint-disable no-undef */
// tests/modifyUser.test.js

const sinon = require('sinon');
const { expect } = require('chai');
const { carCheck  } = require('../middleware/authorize');

const db = require('../db/models');
const Car = db.Car;

describe('carCheck', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: { carId: '123' } };
        res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should set userId and call next() when car exists', async () => {
        const fakeCar = { SellerID: '12345' };
        sandbox.stub(Car, 'findByPk').returns(Promise.resolve(fakeCar));

        await carCheck(req, res, next);

        expect(req.params.userId).to.equal(fakeCar.SellerID);
        sinon.assert.calledOnce(next);
    });

    it('should send 404 if the car does not exist', async () => {
        sandbox.stub(Car, 'findByPk').returns(Promise.resolve(null)); // Car does not exist

        await carCheck(req, res, next);

        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, 'Car not found');
    });
});