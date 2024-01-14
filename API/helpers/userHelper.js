const bcrypt = require('bcrypt');
const db = require('../db/models');
const User = db.User;

exports.modifyUserData = async (userId, updatedFields, res) => {
    try {
        const user = await User.findByPk(userId);
        // If password is present, hash it.
        if (updatedFields.Password) {
            updatedFields.Password = await bcrypt.hash(updatedFields.Password, 10);
        }

        if (Object.keys(updatedFields).length > 0) {
            await User.update(updatedFields, { where: { id: userId } });
            res.status(200).json({ message: 'User modified!' });
        } else {
            res.status(200).json({ message: 'No valid fields provided for update!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.deleteUser = (userId, res) => {
    return User.findByPk(userId)
    .then(user => {
        return user.destroy()
            .then(() => res.status(200).json({ message: 'User successfully deleted.' }))
            .catch(error => {
                // Handle error during deletion
                res.status(500).json({ error });
            });
    })
    .catch(error => res.status(500).json({ error }));
}