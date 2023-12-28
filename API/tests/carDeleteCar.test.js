/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { deleteCar  } = require('../controllers/car');
const fs = require('fs');

const db = require('../db/models');
const Car = db.Car;
const CarDetail = db.CarDetail;
const CarImage = db.CarImage;

describe('deleteCar', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: { carId: 1 } };
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should delete the car and associated details and images and return status 200', async () => {
        const fakeCar = { id: 1, destroy: sinon.stub().resolves() };
        const fakeDetails = [{ id: 1, destroy: sinon.stub().resolves() }];
        const fakeImages = [{ id: 1, ImageURL: 'path/to/image.jpg', destroy: sinon.stub().resolves() }];
    
        sandbox.stub(Car, 'findByPk').resolves(fakeCar);
        sandbox.stub(CarDetail, 'findAll').resolves(fakeDetails);
        sandbox.stub(CarImage, 'findAll').resolves(fakeImages);
        sandbox.stub(fs, 'unlink').callsFake(async (path) => {
            console.log('Mocked fs.unlink called for:', path);
            return Promise.resolve();
        });
    
        await deleteCar(req, res);
    
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith({ message: 'car deleted!' })).to.be.true;
        expect(fakeCar.destroy.calledOnce).to.be.true; // Ensure car is destroyed
        fakeDetails.forEach(detail => {
            expect(detail.destroy.calledOnce).to.be.true; // Ensure each detail is destroyed
        });
        fakeImages.forEach(image => {
            expect(image.destroy.calledOnce).to.be.true; // Ensure each image is destroyed
        });
    });
    
});