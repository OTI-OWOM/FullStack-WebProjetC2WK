const db = require('../db/models');
const CarDetail = db.CarDetail;

/**
* Add a new car details
* @param {object} req - request
* @param {object} res - response
*/
exports.createCarDetail = async (req, res) => {
    const carDetailList = req.body.details;
    if (!carDetailList) {
        return res.status(400).json({ error: "No Details Found" });
    }
    try {
        for (const carDetail of carDetailList) {
            carDetail.CarID = req.params.carId;
            const detail = await CarDetail.findOne({ where: { DetailName: carDetail.DetailName, CarID: carDetail.CarID } });
            if (detail) {
                await detail.update(carDetail);
            } else {
                const detailDelete = await CarDetail.findByPk(carDetail.id);
                if (detailDelete) {
                    await detailDelete.destroy(carDetail);
                }
                await CarDetail.create(carDetail);
            }
        }
        res.status(201).json({ message: 'Car detail added!' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error, message: "Test" });
    }
};

/**
* Delete a new car detail
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteCarDetail = async (req, res) => {
    const detail = await CarDetail.findByPk(req.params.detailId);

    return detail.destroy()
        .then(() => res.status(200).json({ message: 'Car detail deleted!' }))
        .catch(error => res.status(400).json({ error }));;
};