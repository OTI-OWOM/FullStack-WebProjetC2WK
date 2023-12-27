/* eslint-disable no-undef */
// tests/modifyUser.test.js

const sinon = require('sinon');
const { expect } = require('chai');
const { getAllcars  } = require('../controllers/car');
const formatHelper = require('../helpers/formatHelper');

const db = require('../db/models');
const Car = db.Car;
const ModelBrand = db.ModelBrand;
const Brand = db.Brand;;
const CarDetail = db.CarDetail;;

describe('getAllcars', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {};
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return all cars with status 200', async () => {
        const fakeCars = [{ id: 1, Year: 2020, Price: 30000, Description: 'Car 1', Available: 1, ModelBrandID: 1, SellerID: 1 }];
        sandbox.stub(Car, 'findAll').returns(Promise.resolve(fakeCars));
        sandbox.stub(ModelBrand, 'findByPk').returns(Promise.resolve({ ModelName: 'Model1', BrandID: 1 }));
        sandbox.stub(Brand, 'findByPk').returns(Promise.resolve({ BrandName: 'Brand1' }));
        sandbox.stub(CarDetail, 'findAll').returns(Promise.resolve([])); // Assuming no car details for simplicity

        await getAllcars(req, res);

        sinon.assert.calledWith(res.status, 200);
        expect(res.json.calledOnce).to.be.true;
    });

    it('should return status 400 on error', async () => {
        sandbox.stub(Car, 'findAll').rejects(new Error('Database error'));

        await getAllcars(req, res);

        sinon.assert.calledWith(res.status, 400);
        expect(res.json.calledOnce).to.be.true;
    });
});