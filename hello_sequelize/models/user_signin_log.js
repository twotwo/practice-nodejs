/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_signin_log', {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    signin_time: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    score: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 't_project_user_signin_log'
  });
};
