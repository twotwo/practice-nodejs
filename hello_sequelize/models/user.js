/**
 * 表结构对应: user.sql
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    username: {
      type: DataTypes.STRING(100),
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(16),
      field: 'password'
    },
    email: {
      type: DataTypes.STRING(100),
      field: 'email'
    },
    signinTime: {
      type: DataTypes.INTEGER(10),
      field: 'signin_time'
    },
    score: {
      type: DataTypes.INTEGER(5),
      field: 'score'
    }
  }, {
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
    //使用下划线命名法
    underscored: true,
    //不自动修改表名
    freezeTableName: true,
    // define the table's name
    tableName: 't_project_user'
  })
};