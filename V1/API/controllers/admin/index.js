const db = require('../../db/models');
const User = db.User;
const modelService = require('../../services/modelService');
const formatService = require('../../services/formatService');

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
            const usersFormatted = await Promise.all(users.map(user => formatService.userFormat(user)));
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
        modelService.modifyModel(User, req.params.userId, req.body, res);
    }

    /**
     * Get one user's data.
     */
    getOneUser(req, res) {
        return User.findByPk(req.params.userId, {
            attributes: { exclude: ['Password'] }
        })
        .then(async user => res.status(200).json(await formatService.userFormat(user)))
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
        modelService.deleteModel(User, req.params.userId, res);
    }
}

// Export an instance of the class
module.exports = new AdminController();