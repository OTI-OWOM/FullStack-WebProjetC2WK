const Validator = require('validatorjs');
const db = require('../db/models');
const User = db.User;
const ModelBrand = db.ModelBrand;

module.exports = async (req, res, next) => {
    let data = {};
    if (req.body.product) {
        try {
            data = JSON.parse(req.body.product);
        } catch (error) {
            data = req.body.product;
        }
    } else {
        data = req.body;
    }

    // Schema that our data must match to
    const inputSchema = {
        Year: ['integer', `between: 1886, ${new Date().getFullYear()}`],
        Description: ['regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:200'],
        Available: ['integer', 'between: 0, 1'],
        SellerID : ['integer', 'between: 0, 9007199254740991'], // Number.MAX_SAFE_INTEGER = 9007199254740991
        ModelBrandID: ['integer', 'between: 0, 9007199254740991'],
    };

    const validation = new Validator(data, inputSchema);

    if (validation.passes()) {
        next();
    } else {
        // 422 : Unprocessable Entity
        res.status(422).json({ 
            message: 'invalid input: did not pass validation',
            errors: validation.errors.all()
         });
    }
};
