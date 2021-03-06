const { paginate } = require('sequelize-paginate');

module.exports = (sequelize, Sequelize) => {
  const Blacklist = sequelize.define('blacklist', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['token']
      }
    ]
  });

  paginate(Blacklist);
  return Blacklist;
};
