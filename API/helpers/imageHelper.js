const path = require('path');
const fs = require('fs');
const { log } = require('console');

exports.uploadImage = (Model, files, res) => {
    if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const imagePaths = files.map(file => ({
        ImageURL: file.path, // Use the same field name as in your model
        CarID: carId
    }));

    return Model.bulkCreate(imagePaths)
        .then(() => res.status(201).json({ message: 'Images successfully uploaded.' }))
        .catch(error => res.status(500).json({ error: error.message }));
}

exports.getImage = async (Model, imageId, res) => {
    const image = await Model.findByPk(imageId);
    console.log(`==================================================: ${imageId}`);
    let imagePath;
    try{
        imagePath = path.join(__dirname, '..', image.ImageURL);
    } catch(err) {
        return res.status(500).json({error : err})
    }
    
    if (fs.existsSync(imagePath)) {
        return res.sendFile(imagePath);
    } else {
        return res.status(404).json({ error: 'Image not found!' });
    }
};

exports.deleteImage = async (Model, imageId, res) => {
    const image = await Model.findByPk(imageId);
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