module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("Model", {
        ModelName: {
            type: Sequelize.STRING
        }
    });

    return Model;
};
