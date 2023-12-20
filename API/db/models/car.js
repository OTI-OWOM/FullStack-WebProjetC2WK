module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("Car", {
        Year: {
            type: Sequelize.INTEGER
        },
        Price: {
            type: Sequelize.DECIMAL(10, 2)
        },
        Description: {
            type: Sequelize.TEXT
        },
        Available: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return Car;
};
