/* eslint-disable no-undef */

const sinon = require('sinon');
const { expect } = require('chai');
const { deleteCarDetail  } = require('../controllers/car-details');

const db = require('../../../db/models');
const CarDetail = db.CarDetail;

describe('deleteCarDetail', () => {
    let sandbox;
    let req, res;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should delete a car detail and return status 200', async () => {
        // Arrange
        const detailId = 1;
        const fakeDetail = { id: detailId, destroy: sinon.stub().resolves() };
        req = { params: { detailId } };

        sandbox.stub(CarDetail, 'findByPk').resolves(fakeDetail);

        // Act
        await deleteCarDetail(req, res);

        // Assert
        expect(fakeDetail.destroy.calledOnce).to.be.true;
        sinon.assert.calledWithExactly(res.status, 200);
        expect(res.json.calledOnceWith({ message: 'Car detail deleted!' })).to.be.true;
    });

    it('should return status 400 on a database error', async () => {
        // Arrange
        const detailId = 2;
        req = { params: { detailId } };
        const error = new Error('Database error');
        sandbox.stub(CarDetail, 'findByPk').resolves({ id: detailId, destroy: sinon.stub().rejects(error) });

        // Act
        await deleteCarDetail(req, res);

        // Assert
        sinon.assert.calledWithExactly(res.status, 400);
        expect(res.json.calledOnceWith({ error })).to.be.true;
    });
});