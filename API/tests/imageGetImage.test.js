/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { getImage  } = require('../controllers/car-images');
const path = require('path');
const fs = require('fs');

const db = require('../db/models');
const CarImage = db.CarImage;

describe('getImage', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { sendFile: sinon.spy(), status: sinon.stub().returnsThis(), send: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should send the image file if it exists', async () => {
        // Arrange
        const imageId = 1;
        const fakeImage = { id: imageId, ImageURL: 'images/image1.jpg' };
        req = { params: { imageId } };
        const imagePath = path.join(__dirname, '..', fakeImage.ImageURL);

        sandbox.stub(CarImage, 'findByPk').resolves(fakeImage);
        sandbox.stub(fs, 'existsSync').withArgs(imagePath).returns(true);

        // Act
        await getImage(req, res);

        // Assert
        expect(res.sendFile.calledOnceWith(imagePath)).to.be.true;
    });

    it('should return status 404 if the image file does not exist', async () => {
        // Arrange
        const imageId = 2;
        const fakeImage = { id: imageId, ImageURL: 'images/image2.jpg' };
        req = { params: { imageId } };
        const imagePath = path.join(__dirname, '..', fakeImage.ImageURL);

        sandbox.stub(CarImage, 'findByPk').resolves(fakeImage);
        sandbox.stub(fs, 'existsSync').withArgs(imagePath).returns(false);

        // Act
        await getImage(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 404);
        expect(res.send.calledOnceWith('Image not found')).to.be.true;
    });
});