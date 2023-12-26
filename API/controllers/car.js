const formatHelper = require('../helpers/formatHelper');
const db = require('../db/models');
const path = require('path');
const fs = require('fs');
const Car = db.Car;
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;
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
* Upload car Images to the DB and API
* @param {object} req - request
* @param {object} res - response
*/
exports.uploadCarImages = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const imagePaths = req.files.map(file => ({
        ImageURL: file.path, // Use the same field name as in your model
        CarID: req.params.carId
    }));

    CarImage.bulkCreate(imagePaths)
        .then(() => res.status(201).send('Images successfully uploaded.'))
        .catch(error => res.status(500).send(error.message));
};

/**
* Get the images from the API
* @param {object} req - request
* @param {object} res - response
*/
exports.getImageURLs = async (req, res) => {
    try {
        const carId = req.params.carId;
        const carImages = await CarImage.findAll({
            where: { CarID: carId }
        });

        const imageUrls = carImages.map(img => img.ImageURL.split("/")[1]);

        res.json({ images: imageUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

/**
* Get the Image
* @param {object} req - request
* @param {object} res - response
*/
exports.getImage = async (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '..', 'images', filename);
    
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Image not found');
    }
};

/**
* Delete the Image
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteImage = async (req, res) => {
    const image = await CarImage.findByPk(req.params.imageId);
    const imagePath = path.join(__dirname, '..', image.ImageURL);
    
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
        } else {
            image.destroy();
            res.status(200).json({ message: 'Image deleted!' });
        }
    });
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
exports.createcar = (req, res) => {
    let carObject = req.body;
    carObject.SellerID = req.auth.userId;

    Car.create(carObject)
        .then(() => res.status(201).json({ message: 'car added!' }))
        .catch(error => res.status(400).json({ error }));
};

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


/**
* Modify an existing car
* @param {object} req - request
* @param {object} res - response
*/
exports.modifycar = (req, res) => {
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
exports.deletecar = async (req, res) => {
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

