module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
      Name: {
          type: Sequelize.STRING
      },
      Email: {
          type: Sequelize.STRING,
          unique: true
      },
      Password: {
          type: Sequelize.STRING
      },
      IsSeller: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      Role: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      }
  });

  return User;
};
