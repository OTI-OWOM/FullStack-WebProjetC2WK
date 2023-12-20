const Sequelize = require("sequelize");
const sequelize = new Sequelize("C2WK", process.env.MYSQL_NAME, process.env.MYSQL_PWD, {
  host: process.env.MYSQL_URL,
  dialect: "mariadb",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require("./user.js")(sequelize, Sequelize);
db.car = require("./car.js")(sequelize, Sequelize);
db.brand = require("./brand.js")(sequelize, Sequelize);
db.model = require("./model.js")(sequelize, Sequelize);
db.carImage = require("./carImage.js")(sequelize, Sequelize);
db.carDetail = require("./carDetail.js")(sequelize, Sequelize);
db.review = require("./review.js")(sequelize, Sequelize);

// Define associations
const setupAssociations = require('./relations');
setupAssociations(sequelize);

module.exports = db;