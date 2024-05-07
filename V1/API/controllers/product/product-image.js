const db = require('../../db/models');

const imageHelper = require('../../services/imageService');
const CarImage = db.CarImage;

class ProductImageController {
    /**
     * Upload car images to the DB and API.
     */
    uploadCarImages(req, res) {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const imagePaths = req.files.map(file => ({
            ImageURL: file.path,
            CarID: req.params.carId
        }));

        return CarImage.bulkCreate(imagePaths)
            .then(() => res.status(201).json({ message: 'Images successfully uploaded.' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    /**
     * Get the image URLs from a car.
     */
    async getImageURLs(req, res) {
        try {
            const carId = req.params.carId;
            const carImages = await CarImage.findAll({
                where: { CarID: carId }
            });

            const images = carImages.map(img => ({
                url: img.ImageURL.split("/")[2], 
                id: img.id
            }));

            res.json(images);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error!' });
        }
    }

    /**
     * Get a specific image.
     */
    getImage(req, res) {
        imageHelper.getImage(CarImage, req.params.imageId, res);
    }

    /**
     * Delete a specific image.
     */
    async deleteImage(req, res) {
        imageHelper.deleteImage(CarImage, req.params.imageId, res);
    }
}

// Export an instance of the class
module.exports = new ProductImageController();
