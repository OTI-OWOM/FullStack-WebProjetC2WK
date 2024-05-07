/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { createCarDetail  } = require('../controllers/car-details');

const db = require('../../../db/models');
const CarDetail = db.CarDetail;

describe('createCarDetail', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should add a new car detail and return status 201', async () => {
        // Arrange
        const carDetailObject = { DetailName: 'Color', DetailValue: 'Red', CarID: 1 };
        req = { body: carDetailObject, params: { carId: 1 } };

        sandbox.stub(CarDetail, 'findAll').resolves([]);
        sandbox.stub(CarDetail, 'create').resolves();

        // Act
        await createCarDetail(req, res);

        // Assert
        sinon.assert.calledWithExactly(CarDetail.create, carDetailObject);
        sinon.assert.calledWithExactly(res.status, 201);
        expect(res.json.calledOnceWith({ message: 'Car detail added!' })).to.be.true;
    });

    it('should return status 400 if the detail name is not unique', async () => {
        // Arrange
        const carDetailObject = { DetailName: 'Color', DetailValue: 'Red', CarID: 1 };
        req = { body: carDetailObject, params: { carId: 1 } };
        const existingDetail = [carDetailObject];

        sandbox.stub(CarDetail, 'findAll').resolves(existingDetail);

        // Act
        await createCarDetail(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.json.calledOnceWith({ message: 'The Detail Name should be unique' })).to.be.true;
    });
});