/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { uploadCarImages  } = require('../controllers/car-images');

const db = require('../../../db/models');
const CarImage = db.CarImage;

describe('uploadCarImages', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should upload images and return status 201', async () => {
        // Arrange
        const fakeFiles = [
            { path: 'path/to/image1.jpg' },
            { path: 'path/to/image2.jpg' }
        ];
        req = { files: fakeFiles, params: { carId: 1 } };

        sandbox.stub(CarImage, 'bulkCreate').resolves();    
        
        const expectedImagePaths = fakeFiles.map(file => ({
            ImageURL: file.path,
            CarID: req.params.carId
        }));

        // Act
        await uploadCarImages(req, res);

        // Assert
        sinon.assert.calledWithExactly(CarImage.bulkCreate, expectedImagePaths);
        sinon.assert.calledWithExactly(res.status, 201);
        expect(res.send.calledOnceWith('Images successfully uploaded.')).to.be.true;
    
    });

    it('should return status 400 if no files are uploaded', async () => {
        // Arrange
        req = { files: [], params: { carId: 1 } };

        // Act
        await uploadCarImages(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.send.calledOnceWith('No files were uploaded.')).to.be.true;
    });

    // Additional test case for handling errors during bulkCreate
    it('should return status 500 on a database error', async () => {
        // Arrange
        const fakeFiles = [{ path: 'path/to/image.jpg' }];
        req = { files: fakeFiles, params: { carId: 1 } };
        const error = new Error('Database error');
        sandbox.stub(CarImage, 'bulkCreate').rejects(error);

        // Act
        await uploadCarImages(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 500);
        expect(res.send.calledOnceWith(error.message)).to.be.true;
    });
});