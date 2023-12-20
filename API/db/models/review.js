module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("Review", {
        Rating: {
            type: Sequelize.INTEGER
        },
        Comment: {
            type: Sequelize.TEXT
        },
        ReviewDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Review;
};
