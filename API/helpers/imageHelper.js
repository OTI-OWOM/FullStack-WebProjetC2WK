const path = require('path');
const fs = require('fs');

class ImageHelper {
    /**
     * Upload images associated with a model.
     */
    uploadImage(Model, files, carId, res) {
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const imagePaths = files.map(file => ({
            ImageURL: file.path,
            CarID: carId
        }));

        return Model.bulkCreate(imagePaths)
            .then(() => res.status(201).json({ message: 'Images successfully uploaded.' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    /**
     * Retrieve an image associated with a model.
     */
    async getImage(Model, imageId, res) {
        const image = await Model.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ error: 'Image not found!' });
        }

        let imagePath;
        try {
            imagePath = path.join(__dirname, '..', image.ImageURL);
        } catch (err) {
            return res.status(500).json({ error: err });
        }

        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        } else {
            return res.status(404).json({ error: 'Image not found!' });
        }
    }

    /**
     * Delete an image associated with a model.
     */
    async deleteImage(Model, imageId, res) {
        const image = await Model.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found!' });
        }

        const imagePath = path.join(__dirname, '..', image.ImageURL);

        fs.unlink(imagePath, err => {
            if (err) {
                console.error('Error deleting the file:', err);
                return res.status(500).json({ error: 'Failed to delete the image.' });
            } else {
                image.destroy();
                res.status(200).json({ message: 'Image deleted!' });
            }
        });
    }
}

// Export an instance of the class
module.exports = new ImageHelper();
