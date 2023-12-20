module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("Brand", {
        BrandName: {
            type: Sequelize.STRING,
            unique: true
        }
    });

    return Brand;
};
