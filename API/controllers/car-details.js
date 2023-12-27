const db = require('../db/models');
const CarDetail = db.CarDetail;

/**
* Add a new car detail
* @param {object} req - request
* @param {object} res - response
*/
exports.createCarDetail = async (req, res) => {
    const carObject = req.body;
    carObject.CarID = req.params.carId;
    const cars = await CarDetail.findAll({ where: { DetailName: req.body.DetailName, CarID: req.body.CarID }});

    if (cars.length !== 0) {
        return res.status(400).json({message: 'The Detail Name should be unique'})
    }
    CarDetail.create(carObject)
        .then(() => res.status(201).json({ message: 'Car detail added!' }))
        .catch(error => res.status(400).json({ error }));
};

/**
* Delete a new car detail
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteCarDetail = async (req, res) => {
    const detail = await CarDetail.findByPk(req.params.detailId);

    detail.destroy()        
        .then(() => res.status(200).json({ message: 'Car detail deleted!' }))
        .catch(error => res.status(400).json({ error }));;
};