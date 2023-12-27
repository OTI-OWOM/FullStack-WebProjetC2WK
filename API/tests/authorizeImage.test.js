/* eslint-disable no-undef */
// tests/modifyUser.test.js

const sinon = require('sinon');
const { expect } = require('chai');
const { imageCheck  } = require('../middleware/authorize');

const db = require('../db/models');
const CarImage = db.CarImage;

describe('imageCheck', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: { imageId: '123' } };
        res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should set carId and call next() when the image exists', async () => {
        const fakeImage = { CarID: '456' };
        sandbox.stub(CarImage, 'findByPk').returns(Promise.resolve(fakeImage));

        await imageCheck(req, res, next);

        expect(req.params.carId).to.equal(fakeImage.CarID);
        sinon.assert.calledOnce(next);
    });

    it('should send 404 if the image does not exist', async () => {
        sandbox.stub(CarImage, 'findByPk').returns(Promise.resolve(null)); // Image does not exist

        await imageCheck(req, res, next);

        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, 'Image not found');
    });
});