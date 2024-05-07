/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getAllModelbrand  } = require('../controllers/car-brands');

const db = require('../../../db/models');
const ModelBrand = db.ModelBrand;
const Brand = db.Brand;

describe('getAllModelbrand', () => {
    let sandbox;
    let res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve all model brands with their brand names and return status 200', async () => {
        // Arrange
        const fakeModelBrands = [
            { id: 1, ModelName: 'Model1', BrandID: 1 },
            { id: 2, ModelName: 'Model2', BrandID: 2 }
        ];
        const fakeBrands = [
            { id: 1, BrandName: 'Brand1' },
            { id: 2, BrandName: 'Brand2' }
        ];

        sandbox.stub(ModelBrand, 'findAll').resolves(fakeModelBrands);

        sandbox.stub(Brand, 'findByPk').callsFake((brandId) => {
            return Promise.resolve(fakeBrands.find(brand => brand.id === brandId));
        });
        // Act
        await getAllModelbrand(null, res);

        // Assert
        const expectedModels = fakeModelBrands.map(model => ({
            id: model.id,
            ModelName: model.ModelName,
            BrandID: model.BrandID,
            BrandName: fakeBrands.find(brand => brand.id === model.BrandID).BrandName
        }));
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith(expectedModels)).to.be.true;
    });
});