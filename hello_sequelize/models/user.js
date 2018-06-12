//获取Sequelize单一实例
const Factory = require('../libs/sequelize_factory');

/**
 * 表结构对应: user.sql
 */
module.exports = (sequelize, DataTypes) => {
  return Factory.sequelize.define("user", {
    username: {
      type: Factory.Sequelize.STRING(100),
      field: 'username'
    },
    password: {
      type: Factory.Sequelize.STRING(16),
      field: 'password'
    },
    email: {
      type: Factory.Sequelize.STRING(100),
      field: 'email'
    },
    signinTime: {
      type: Factory.Sequelize.INTEGER(10),
      field: 'signin_time'
    },
    score: {
      type: Factory.Sequelize.INTEGER(5),
      field: 'score'
    }
  }, {
    //不添加创建、更新时间戳
    timestamps: false,
    //使用下划线命名法
    underscored: true,
    //不自动修改表名
    freezeTableName: true,
    // define the table's name
    tableName: 't_project_user'
  })
};