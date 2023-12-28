/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { detailCheck  } = require('../middleware/authorize');

const db = require('../db/models');
const CarDetail = db.CarDetail;

describe('detailCheck', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { params: { detailId: '123' } };
        res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
        next = sinon.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should set carId and call next() when the image exists', async () => {
        const fakeDetail = { CarID: '456' };
        sandbox.stub(CarDetail, 'findByPk').returns(Promise.resolve(fakeDetail));

        await detailCheck(req, res, next);

        expect(req.params.carId).to.equal(fakeDetail.CarID);
        sinon.assert.calledOnce(next);
    });

    it('should send 404 if the image does not exist', async () => {
        sandbox.stub(CarDetail, 'findByPk').returns(Promise.resolve(null)); // Detail does not exist

        await detailCheck(req, res, next);

        sinon.assert.calledWith(res.status, 404);
        sinon.assert.calledWith(res.send, 'Detail not found');
    });
});