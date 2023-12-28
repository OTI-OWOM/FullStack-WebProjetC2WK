/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getImageURLs  } = require('../controllers/car-images');

const db = require('../db/models');
const CarImage = db.CarImage;

describe('getImageURLs', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { json: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should retrieve image URLs for a car and return them', async () => {
        // Arrange
        const carId = 1;
        const fakeImages = [
            { id: 1, ImageURL: 'path/to/image1.jpg' },
            { id: 2, ImageURL: 'path/to/image2.jpg' }
        ];
        req = { params: { carId } };

        sandbox.stub(CarImage, 'findAll').resolves(fakeImages);

        // Act
        await getImageURLs(req, res);

        // Assert
        expect(res.json.calledOnce).to.be.true;
        const responseArg = res.json.firstCall.args[0];
        expect(responseArg).to.be.an('array').that.has.lengthOf(fakeImages.length);
        responseArg.forEach((img, index) => {
            expect(img).to.have.property('url').that.equals(fakeImages[index].ImageURL.split('/')[1]);
            expect(img).to.have.property('id').that.equals(fakeImages[index].id);
        });
    });

    it('should return status 500 on a database error', async () => {
        // Arrange
        const carId = 2;
        req = { params: { carId } };
        const error = new Error('Database error');
        sandbox.stub(CarImage, 'findAll').rejects(error);

        // Act
        await getImageURLs(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.send.calledOnceWith('Internal Server Error')).to.be.true;
    });
});