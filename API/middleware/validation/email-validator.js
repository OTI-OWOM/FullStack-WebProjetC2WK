const EmailValidator = require('validatorjs');

module.exports = (req, res, next) => {
    if (!req.body.Email) {
        next();
        return;
    }
    // Validate the email syntax
    const emailSchema = {
        Email: 'required|email',
    };
    const emailValidation = new EmailValidator(req.body, emailSchema);
    const isValidEmail = emailValidation.passes();
    
    if (!isValidEmail) {
        // 422 : Unprocessable Entity
        res.status(422).json({ message: 'Invalid email, use a correct email.' });
        return;
    }
    next();
};
