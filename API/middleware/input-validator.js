const Validator = require('validatorjs');

module.exports = (req, res, next) => {
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
        name: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:20'],
        description: ['required', 'regex:/^[\' 0-9A-ZÀÂÄÇÉÈÊËÎÏÔÙÛÜa-zàâäçéèêëîïôùûü_+%#\\-]+$/', 'max:200'],
        // Number.MAX_SAFE_INTEGER = 9007199254740991
        price: ['required', 'integer', 'between: 0, 9007199254740991'],
    };

    const validation = new Validator(data, inputSchema);

    if (validation.passes()) {
        next();
    } else {
        // 422 : Unprocessable Entity
        res.status(422).json({ message: 'invalid input: did not pass validation' });
    }
};
