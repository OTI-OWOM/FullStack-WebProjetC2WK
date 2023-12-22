const Validator = require('validatorjs');
const db = require('../db/models');
const ModelBrand = db.ModelBrand;

module.exports = async (req, res, next) => {
    let data = {};
    if (req.body) {
        try {
            data = JSON.parse(req.body);
        } catch (error) {
            data = req.body;
        }
    } else {
        data = req.body;
    }

    // Schema that our data must match to
    const inputSchema = {
        Year: ['required', 'integer', `between: 1886, ${new Date().getFullYear()}`],
        Description: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:200'],
        Available: ['required', 'integer', 'between: 0, 1'],
        Price : ['required', 'integer', 'between: 0, 9007199254740991'],
        ModelBrandID: ['required', 'integer', 'between: 0, 9007199254740991'],
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
        res.status(422).json({ 
            message: 'invalid input: did not pass validation',
            errors: validation.errors.all()
         });
    }

    try {
        // Verify ModelBrandID
        const modelBrandExists = await ModelBrand.findByPk(data.ModelBrandID);
        if (!modelBrandExists) {
            return res.status(404).json({ message: 'Model Brand not found' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
