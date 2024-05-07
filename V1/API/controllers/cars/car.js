const path = require('path');
const fs = require('fs');

const formatHelper = require('../../helpers/formatHelper');

const db = require('../../db/models');
const User = db.User;
const Car = db.Car;
const CarDetail = db.CarDetail;
const CarImage = db.CarImage;


class CarController {
    /**
     * Get all existing cars from the API.
     */
    getAllCars(req, res) {
        return Car.findAll()
            .then(async cars => {
                const formattedCars = await Promise.all(cars.map(car => formatHelper.carFormat(car)));
                return res.status(200).json(formattedCars);
            })
            .catch(error => {
                console.log(error);
                return res.status(400).json({ error });
            });
    }

    /**
     * For a user, get all their cars from the API.
     */
    getAllCarsFromUser(req, res) {
        return Car.findAll({ where: { SellerID: req.params.userId } })
            .then(async cars => {
                const formattedCars = await Promise.all(cars.map(car => formatHelper.carFormat(car)));
                res.status(200).json(formattedCars);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error });
            });
    }

    /**
     * For the authenticated user, get all their cars from the API.
     */
    getAllCarsFromSelf(req, res) {
        return Car.findAll({ where: { SellerID: req.auth.userId } })
            .then(async cars => {
                const formattedCars = await Promise.all(cars.map(car => formatHelper.carFormat(car)));
                res.status(200).json(formattedCars);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error });
            });
    }

    /**
     * For a company, get all its cars from the API.
     */
    getAllCarsFromCompany(req, res) {
        return Car.findAll({ where: { SellerID: req.params.companyId } })
            .then(async cars => {
                const formattedCars = await Promise.all(cars.map(car => formatHelper.carFormat(car)));
                res.status(200).json(formattedCars);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ error });
            });
    }

    /**
     * Get a particular car from the API.
     */
    getOneCar(req, res) {
        return Car.findByPk(req.params.carId)
            .then(async car => {
                if (!car) {
                    return res.status(404).json({ error: 'Car not found' });
                }
                res.status(200).json(await formatHelper.carFormat(car));
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({ error });
            });
    }

    /**
     * Add a new car.
     */
    async createCar(req, res) {
        let carObject = req.body;
        carObject.SellerID = req.auth.userId;
        carObject.CompanyID = req.auth.companyId;

        await User.update({"IsSeller": true}, { where: { id: req.auth.userId } });

        return Car.create(carObject)
            .then(car => res.status(201).json({ message: 'Car added!', carId: car.id }))
            .catch(error => res.status(400).json({ error }));
    }

    /**
     * Modify an existing car.
     */
    modifyCar(req, res) {
        return Car.findByPk(req.params.carId)
            .then(car => {
                if (!car) {
                    return res.status(404).json({ message: 'Car not found !' });
                }
                return car.update(req.body)
                    .then(() => res.status(200).json({ message: 'Car modified!' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({ error });
            });
    }

    /**
     * Delete an existing car.
     */
    async deleteCar(req, res) {
        const car = await Car.findByPk(req.params.carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found!' });
        }

        const details = await CarDetail.findAll({ where: { CarID: car.id } });
        const images = await CarImage.findAll({ where: { CarID: car.id } });

        details.forEach(detail => {
            detail.destroy();
        });
        
        images.forEach(image => {
            const imagePath = path.join(__dirname, '..', '..', image.ImageURL);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting the file:', err);
                } else {
                    image.destroy();
                }
            });
        });

        return car.destroy()
            .then(() => res.status(200).json({ message: 'Car deleted!' }))
            .catch(error => res.status(400).json({ error }));
    }
}

// Export an instance of the class
module.exports = new CarController();
