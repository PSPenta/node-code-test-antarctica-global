const { paginate } = require('sequelize-paginate');

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employee', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    employeeID: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    organization: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  paginate(Employee);
  return Employee;
};
