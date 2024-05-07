const bcrypt = require('bcrypt');

class ModelService {
    /**
     * Modify a model instance with provided fields.
     */
    async modifyModel(Model, modelId, updatedFields, res) {
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

    /**
     * Delete a model instance.
     */
    deleteModel(Model, modelId, res) {
        return Model.findByPk(modelId)
            .then(model => {
                if (!model) {
                    return res.status(404).json({ message: 'Model not found.' });
                }

                return model.destroy()
                    .then(() => res.status(200).json({ message: 'Successfully deleted.' }))
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }
}

// Export an instance of the class
module.exports = new ModelService();
