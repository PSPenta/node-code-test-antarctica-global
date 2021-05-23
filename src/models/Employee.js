const { paginate } = require('sequelize-paginate');

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define('employee', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    employeeId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    organization: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['employee_id', 'organization']
      }
    ]
  });

  paginate(Employee);
  return Employee;
};
