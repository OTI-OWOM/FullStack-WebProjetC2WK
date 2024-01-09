const Validator = require('validatorjs');
const helper = require('../helpers/validationHelper')
const db = require('../db/models');
const Car = db.Car;

module.exports = async (req, res, next) => {
    let data = helper.dataPass(req);

    // Schema that our data must match to
    const inputSchema = {
        DetailName: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:200'],
        DetailValue: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+,%.#\\-]+$/', 'max:200']
    };

    const validation = new Validator(data, inputSchema);

    if (!validation.passes()) {
        // 422 : Unprocessable Entity
        return res.status(422).json({ 
            message: 'invalid input: did not pass validation',
            errors: validation.errors.all()
         });
    }

    try {
        if(carExists.SellerID !== req.auth.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
