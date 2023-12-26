const Validator = require('validatorjs');
const helper = require('../helpers/validationHelper')
const db = require('../db/models');
const ModelBrand = db.ModelBrand;

module.exports = async (req, res, next) => {
    let data = helper.dataPass(req);

    // Schema that our data must match to
    const inputSchema = {
        Year: ['integer', `between: 1886, ${new Date().getFullYear()}`],
        Description: ['regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:200'],
        Available: ['integer', 'between: 0, 1'],
        ModelBrandID: ['integer', 'between: 0, 9007199254740991'],
    };

    // Check for additional fields not in the schema
    const extraneousFields = Object.keys(data).filter(key => !inputSchema.hasOwnProperty(key));
    if (extraneousFields.length > 0) {
        return res.status(422).json({
            message: 'Invalid input: contains extraneous fields',
            extraneousFields
        });
    }

    const validation = new Validator(data, inputSchema);

    if (!validation.passes()) {
        // 422 : Unprocessable Entity
        return res.status(422).json({ 
            message: 'invalid input: did not pass validation',
            errors: validation.errors.all()
         });
    }

    try {
        // Verify ModelBrandID
        const modelBrandExists = await ModelBrand.findByPk(data.ModelBrandID);
        const carExists = await Car.findByPk(req.params.id);

        if (data.ModelBrandID) {
            if (!modelBrandExists) {
                return res.status(404).json({ message: 'Model Brand not found' });
            }
        }

        // Verify that the user has access to change the car
        if (!carExists) {
            return res.status(404).json({ message: 'Car not found' });
        } else if(carExists.SellerID !== req.auth.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
