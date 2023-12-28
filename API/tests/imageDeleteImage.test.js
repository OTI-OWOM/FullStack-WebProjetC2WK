/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { deleteImage  } = require('../controllers/car-images');
const path = require('path');
const fs = require('fs');

const db = require('../db/models');
const CarImage = db.CarImage;

describe('deleteImage', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should delete the image file and database record and return status 200', async () => {
        // Arrange
        const imageId = 1;
        const fakeImage = { id: imageId, ImageURL: 'images/image1.jpg', destroy: sinon.stub().resolves() };
        req = { params: { imageId } };
        const imagePath = path.join(__dirname, '..', fakeImage.ImageURL);

        sandbox.stub(CarImage, 'findByPk').resolves(fakeImage);
        sandbox.stub(fs, 'unlink').callsFake((path, callback) => {
            callback(null); // Simulate successful deletion
        });

        // Act
        await deleteImage(req, res);

        // Assert
        expect(fakeImage.destroy.calledOnce).to.be.true;
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith({ message: 'Image deleted!' })).to.be.true;
    });

    it('should handle file deletion errors', async () => {
        // Arrange
        const imageId = 2;
        const fakeImage = { id: imageId, ImageURL: 'images/image2.jpg', destroy: sinon.stub().resolves() };
        req = { params: { imageId } };
        const imagePath = path.join(__dirname, '..', fakeImage.ImageURL);
        const error = new Error('File deletion error');

        sandbox.stub(CarImage, 'findByPk').resolves(fakeImage);
        sandbox.stub(fs, 'unlink').callsFake((path, callback) => {
            callback(error); // Simulate deletion error
        });

        // Act
        await deleteImage(req, res);

        // Assert
        expect(fakeImage.destroy.notCalled).to.be.true;
    });
});