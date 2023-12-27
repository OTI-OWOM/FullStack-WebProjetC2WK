const path = require('path');
const fs = require('fs');

const formatHelper = require('../helpers/formatHelper');

const db = require('../db/models');
const Car = db.Car;
const CarDetail = db.CarDetail;
const CarImage = db.CarImage;


/**
* Get all existing cars from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllcars = (req, res) => {
    Car.findAll()
        .then(async cars => {
            const formattedCars = await Promise.all(cars.map(car => formatHelper.carFormat(car)));
            res.status(200).json(formattedCars);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });
};


/**
* For a user, get all its cars from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllcarsFromUser = (req, res) => {
    Car.findAll({ where: { SellerID: req.params.userId } })
        .then(async cars => {
            const formattedCars = await Promise.all(cars.map(car => formatHelper.carFormat(car)));
            res.status(200).json(formattedCars);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });
};


/**
* Get a car in particular from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getOnecar = (req, res) => {
    Car.findByPk(req.params.carId)
        .then(async car => {
            if (!car) {
                return res.status(404).json({ error: 'car not found' });
            }
            res.status(200).json(await formatHelper.carFormat(car));
        })
        .catch(error => res.status(404).json({ error }));
};


/**
* Add a new car
* @param {object} req - request
* @param {object} res - response
*/
exports.createCar = (req, res) => {
    let carObject = req.body;
    carObject.SellerID = req.auth.userId;

    Car.create(carObject)
        .then(() => res.status(201).json({ message: 'car added!' }))
        .catch(error => res.status(400).json({ error }));
};

/**
* Modify an existing car
* @param {object} req - request
* @param {object} res - response
*/
exports.modifyCar = (req, res) => {
    Car.findByPk(req.params.carId)
        .then(car => {
            if (!car) {
                return res.status(404).json({ error: 'car not found' });
            }
            return car.update(req.body)
                .then(() => res.status(200).json({ message: 'car modified!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({ error });
        });
};


/**
* Delete an existing car
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteCar = async (req, res) => {
    const car = await Car.findByPk(req.params.carId);
    const details = await CarDetail.findAll({ where: {CarID: car.id}});
    const images = await CarImage.findAll({ where: { CarID: car.id } });

    details.forEach(detail => {
        detail.destroy();
    });

    images.forEach(image => {
        const imagePath = path.join(__dirname, '..', image.ImageURL);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
            } else {
                image.destroy();
            }
        });
    });

    return car.destroy()
        .then(() => res.status(200).json({ message: 'car deleted!' }))
        .catch(error => res.status(400).json({ error }));
};

