/* eslint-disable newline-per-chained-call */
const PasswordValidator = require('password-validator');

module.exports = (req, res, next) => {
    if (!req.body.Password) {
        next();
        return;
    }

    // Validate the password syntax
    const passwordSchema = new PasswordValidator();
    passwordSchema
        .is().min(8) // Minimum length : 8
        .is().max(100) // Maximum length : 100
        .has().uppercase() // Must have uppercase letters
        .has().lowercase() // Must have lowercase letters
        .has().digits(1) // Must have at least 1 digits
        .has().not().spaces(); // Should not have spaces

    const isValidPassword = passwordSchema.validate(req.body.Password);
    
    if (!isValidPassword) {
        // 422 : Unprocessable Entity
        res.status(422).json({ message: 'Invalid password, use a secure password.' });
        return;
    }
    next();
};
