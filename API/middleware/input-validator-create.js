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
        Year: ['required', 'integer', `between: 1886, ${new Date().getFullYear()}`],
        Description: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:200'],
        Available: ['required', 'integer', 'between: 0, 1'],
        SellerID : ['required', 'integer', 'between: 0, 9007199254740991'], // Number.MAX_SAFE_INTEGER = 9007199254740991
        ModelBrandID: ['required', 'integer', 'between: 0, 9007199254740991'],
    };

    const validation = new Validator(data, inputSchema);

    if (!validation.passes()) {
        // 422 : Unprocessable Entity
        res.status(422).json({ 
            message: 'invalid input: did not pass validation',
            errors: validation.errors.all()
         });
    }

    try {
        // Verify SellerID
        const sellerExists = await User.findByPk(data.SellerID);
        if (!sellerExists) {
            return res.status(404).json({ message: 'Seller not found' });
        }

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
