const db = require('../../db/models');
const CompanyLogo = db.CompanyLogo;
const Company = db.Company;

const imageHelper = require('../../helpers/imageHelper');

/**
* Upload car Images to the DB and API
* @param {object} req - request
* @param {object} res - response
*/
exports.uploadCompanyLogo = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }
    
    const imagePaths = req.files.map(file => ({
        ImageURL: file.path, // Use the same field name as in your model
        CompanyID: req.params.companyId
    }));

    return CompanyLogo.bulkCreate(imagePaths)
        .then(() => res.status(201).json({ message: 'Images successfully uploaded.' }))
        .catch(error => res.status(500).json({ error: error.message }));
};


/**
* Get the Image
* @param {object} req - request
* @param {object} res - response
*/
exports.getImage = async (req, res) => {
    const companyLogo = await CompanyLogo.findOne({where: {CompanyID: req.params.companyId}});
    imageHelper.getImage(CompanyLogo, companyLogo.id, res);
    // const image = await CompanyLogo.findByPk(req.params.imageId);
    // let imagePath;
    // try{
    //     imagePath = path.join(__dirname, '..', image.ImageURL);
    // } catch(err) {
    //     res.status(500).json({error : err})
    // }
    
    // if (fs.existsSync(imagePath)) {
    //     res.sendFile(imagePath);
    // } else {
    //     res.status(404).json({ error: 'Image not found!' });
    // }
};

/**
* Delete the Image
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteImage = async (req, res) => {
    imageHelper.deleteImage(CompanyLogo, req.params.imageId, res);
    // const image = await CompanyLogo.findByPk(req.params.imageId);
    // const imagePath = path.join(__dirname, '..', image.ImageURL);
    
    // fs.unlink(imagePath, (err) => {
    //     if (err) {
    //         console.error('Error deleting the file:', err);
    //     } else {
    //         image.destroy();
    //         res.status(200).json({ message: 'Image deleted!' });
    //     }
    // });
};