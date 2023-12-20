module.exports = (sequelize, Sequelize) => {
    const CarDetail = sequelize.define("CarDetail", {
        DetailName: {
            type: Sequelize.STRING
        },
        DetailValue: {
            type: Sequelize.STRING
        }
    });

    return CarDetail;
};
