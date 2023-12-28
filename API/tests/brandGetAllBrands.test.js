/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getAllBrands  } = require('../controllers/car-brands');

const db = require('../db/models');
const Brand = db.Brand;

describe('getAllBrands', () => {
    let sandbox;
    let res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve all brands and return status 200', async () => {
        // Arrange
        const fakeBrands = [
            { id: 1, BrandName: 'Brand1' },
            { id: 2, BrandName: 'Brand2' }
        ];

        sandbox.stub(Brand, 'findAll').resolves(fakeBrands);

        // Act
        await getAllBrands(null, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(fakeBrands.map(brand => ({ id: brand.id, BrandName: brand.BrandName })))).to.be.true;
    });
});