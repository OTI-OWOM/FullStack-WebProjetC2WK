const db = require('../../db/models');
const CompanyLogo = db.CompanyLogo;

const imageHelper = require('../../helpers/imageHelper');

class ImageController {
    /**
     * Upload company logo images to the DB and API.
     */
    async uploadCompanyLogo(req, res) {
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
    }

    /**
     * Get the logo image for a company.
     */
    async getImage(req, res) {
        const companyLogo = await CompanyLogo.findOne({ where: { CompanyID: req.params.companyId } });
        imageHelper.getImage(CompanyLogo, companyLogo.id, res);
    }

    /**
     * Delete a logo image.
     */
    async deleteImage(req, res) {
        imageHelper.deleteImage(CompanyLogo, req.params.imageId, res);
    }
}

// Export an instance of the class
module.exports = new ImageController();
