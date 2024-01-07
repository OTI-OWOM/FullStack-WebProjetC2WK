const path = require('path');
const fs = require('fs');
const db = require('../db/models');
const CarImage = db.CarImage;

/**
* Upload car Images to the DB and API
* @param {object} req - request
* @param {object} res - response
*/
exports.uploadCarImages = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const imagePaths = req.files.map(file => ({
        ImageURL: file.path, // Use the same field name as in your model
        CarID: req.params.carId
    }));

    return CarImage.bulkCreate(imagePaths)
        .then(() => res.status(201).json({ message: 'Images successfully uploaded.' }))
        .catch(error => res.status(500).json({ error: error.message }));
};

/**
* Get the images from a car
* @param {object} req - request
* @param {object} res - response
*/
exports.getImageURLs = async (req, res) => {
    try {
        const carId = req.params.carId;
        const carImages = await CarImage.findAll({
            where: { CarID: carId }
        });

        const images = carImages.map(img => {
            return {
                url : img.ImageURL.split("/")[1], 
                id: img.id
            }});

        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
};

/**
* Get the Image
* @param {object} req - request
* @param {object} res - response
*/
exports.getImage = async (req, res) => {
    const image = await CarImage.findByPk(req.params.imageId);
    let imagePath;
    try{
        imagePath = path.join(__dirname, '..', image.ImageURL);
    } catch(err) {
        res.status(500).send(err)
    }
    
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ error: 'Image not found!' });
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