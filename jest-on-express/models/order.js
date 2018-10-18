/**
 * 表结构对应: order.sql
 *
 * [sequelize 数据类型](http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes)
 */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.INTEGER(12),
        primaryKey: true,
        field: 't_id'
      },
      uid: {
        type: DataTypes.STRING(64),
        field: 't_uid'
      },
      goodid: {
        type: DataTypes.INTEGER(12),
        field: 't_goodid_fk'
      },
      status: {
        type: DataTypes.INTEGER(2),
        field: 't_status'
      },
      createtime: {
        type: DataTypes.DATE,
        field: 't_createtime'
      },
      paytime: {
        type: DataTypes.DATE,
        field: 't_paytime'
      }
    },
    {
      // 不添加创建、更新时间戳
      timestamps: false,
      // 使用下划线命名法
      underscored: true,
      // 不自动修改表名
      freezeTableName: true,
      // define the table's name
      tableName: 't_project_order'
    }
  )
}
