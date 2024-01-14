const bcrypt = require('bcrypt');

exports.modifyModel = async (Model, modelId, updatedFields, res) => {
    try {
        // If password is present, hash it.
        if (updatedFields.Password) {
            updatedFields.Password = await bcrypt.hash(updatedFields.Password, 10);
        }

        if (Object.keys(updatedFields).length > 0) {
            await Model.update(updatedFields, { where: { id: modelId } });
            res.status(200).json({ message: 'Modified!' });
        } else {
            res.status(200).json({ message: 'No valid fields provided for update!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.deleteModel = (Model, modelId, res) => {
    return Model.findByPk(modelId)
    .then(model => {
        return model.destroy(Model)
            .then(() => res.status(200).json({ message: 'Successfully deleted.' }))
            .catch(error => {
                // Handle error during deletion
                res.status(500).json({ error });
            });
    })
    .catch(error => res.status(500).json({ error }));
}