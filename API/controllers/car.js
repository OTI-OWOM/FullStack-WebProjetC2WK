const formatHelper = require('../helpers/formatHelper');
const db = require('../db/models');
const Car = db.Car;
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;
const CarDetail = db.CarDetail;


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
* Get all existing Brands from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllBrands = (req, res) => {
    Brand.findAll()
        .then(brands => res.status(200).json(brands.map(function(carBrand) {
            return { id: carBrand.id, BrandName: carBrand.BrandName }; 
        })))
        .catch(error => res.status(400).json({ error }));
};

/**
* Get all existing Brand Models from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllModelbrand = async (req, res) => {
    try {
        const modelbrands = await ModelBrand.findAll();

        const modelDetails = await Promise.all(modelbrands.map(async (model) => {
            const brand = await Brand.findByPk(model.BrandID);
            return { 
                id: model.id, 
                ModelName: model.ModelName, 
                BrandID: model.BrandID, 
                BrandName: brand.BrandName
            };
        }));

        res.status(200).json(modelDetails);
    } catch (error) {
        res.status(400).json({ error });
    }
};


/**
* For a user, get all its cars from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllcarsFromUser = (req, res) => {
    Car.findAll({ where: { SellerID: req.params.user } })
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
    Car.findByPk(req.params.id)
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
exports.createcar = (req, res) => {
    let carObject = req.body;
    carObject.SellerID = req.auth.userId;

    Car.create(carObject)
        .then(() => res.status(201).json({ message: 'car added!' }))
        .catch(error => res.status(400).json({ error }));
};

/**
* Add a new car
* @param {object} req - request
* @param {object} res - response
*/
exports.createcardetail = (req, res) => {
    const carObject = req.body;
    CarDetail.create(carObject)
        .then(() => res.status(201).json({ message: 'car detail added!' }))
        .catch(error => res.status(400).json({ error }));
};


/**
* Modify an existing car
* @param {object} req - request
* @param {object} res - response
*/
exports.modifycar = (req, res) => {
    Car.findByPk(req.params.id)
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
exports.deletecar = (req, res) => {
    Car.findByPk(req.params.id)
        .then(car => {
            if (!car) {
                return res.status(404).json({ error: 'car not found' });
            }
            return car.destroy()
                .then(() => res.status(200).json({ message: 'car deleted!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};


/**
* Like or Dislike a car
* @param {object} req - request
* @param {object} res - response
*/
exports.likeDislikecar = (req, res) => {
    const filter = { _id: req.params.id };

    // Check value of like to know what the user did
    if (req.body.like === 1) {
        // use the $inc and $push operators provided by Mongo DB to update the car
        Car.updateOne(filter, {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
        })
            // 200 : successful request (OK)
            .then(() => res.status(200).json({ message: 'Like' }))
            // 400 : bad request
            .catch((error) => res.status(400).json({ error }));
    } else if (req.body.like === -1) {
        // use the $inc and $push operators provided by Mongo DB to update the car
        Car.updateOne(filter, {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
        })
            // 200 : successful request (OK)
            .then(() => res.status(200).json({ message: 'Dislike' }))
            // 400 : bad request
            .catch((error) => res.status(400).json({ error }));
    } else if (req.body.like === 0) {
        Car.findOne(filter)
            .then((car) => {
                // Check if the user has liked the car
                if (Car.usersLiked.includes(req.body.userId)) {
                    // use the $inc and $pull operators provided by Mongo DB to update the car
                    car.updateOne(filter, {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId },
                    })
                        // 200 : successful request (OK)
                        .then(() => { res.status(200).json({ message: 'Like removed' }); })
                        // 400 : bad request
                        .catch((error) => res.status(400).json({ error }));
                } else if (car.usersDisliked.includes(req.body.userId)) {
                    // Check if the user has disliked the car
                    // use the $inc and $pull operators provided by Mongo DB to update the car
                    car.updateOne(filter, {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId },
                    })
                        // 200 : successful request (OK)
                        .then(() => { res.status(200).json({ message: 'Dislike removed' }); })
                        // 400 : bad request
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            // 400 : bad request
            .catch((error) => res.status(400).json({ error }));
    }
};
