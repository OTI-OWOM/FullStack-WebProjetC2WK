module.exports = (sequelize, Sequelize) => {
    const CarImage = sequelize.define("CarImage", {
        ImageURL: {
            type: Sequelize.STRING
        },
        UploadDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return CarImage;
};
