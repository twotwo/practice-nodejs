//获取Sequelize单一实例
const Factory = require('../libs/sequelize_factory');
const sequelize = Factory.sequelize;
const Sequelize = Factory.Sequelize;

/**
 * 表结构对应../conf/user.sql
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: {
      type: Sequelize.STRING(100),
      field: 'username'
    },
    password: {
      type: Sequelize.STRING(16),
      field: 'password'
    },
    email: {
      type: Sequelize.STRING(100),
      field: 'email'
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