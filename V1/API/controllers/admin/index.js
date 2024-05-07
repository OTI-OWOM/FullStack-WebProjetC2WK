const db = require('../../db/models');
const User = db.User;
const modelHelper = require('../../services/modelService');
const formatHelper = require('../../services/formatService');

class AdminController {
    /**
     * Get all the users' data
     */
    getAllUsers(req, res) {
        return User.findAll({
            where: req.auth.role === 1 ? { CompanyID: req.auth.companyId } : {},
            attributes: { exclude: ['Password'] }
        })
        .then(async users => {
            const usersFormatted = await Promise.all(users.map(user => formatHelper.userFormat(user)));
            res.status(200).json(usersFormatted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "No users in this company!" });
        });
    }

    /**
     * Modify a user's data.
     */
    modifyUser(req, res) {
        modelHelper.modifyModel(User, req.params.userId, req.body, res);
    }

    /**
     * Get one user's data.
     */
    getOneUser(req, res) {
        return User.findByPk(req.params.userId, {
            attributes: { exclude: ['Password'] }
        })
        .then(async user => res.status(200).json(await formatHelper.userFormat(user)))
        .catch(error => res.status(500).json({ error }));
    }

    /**
     * Check if a user is an admin (stubbed method, needs implementation).
     */
    isAdmin(req, res) {
        return res.status(200).send();;
    }

    /**
     * Check if a user is a super admin (stubbed method, needs implementation).
     */
    isSuperAdmin(req, res) {
        return res.status(200).send();
    }

    /**
     * Delete a user.
     */
    deleteUser(req, res) {
        modelHelper.deleteModel(User, req.params.userId, res);
    }
}

// Export an instance of the class
module.exports = new AdminController();