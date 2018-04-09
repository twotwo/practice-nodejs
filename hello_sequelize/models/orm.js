/**
 * Sequelize 带连接池的配置
 */
var config = {
    database: 'test', // 使用哪个数据库
    username: 'node', // 用户名
    password: 'pD#5T~l14+,i', // 口令
    option: {
        operatorsAliases: false, //http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
        host: '106.75.19.156', // 主机名
        port: 3306, // 端口号，MySQL默认3306
        logging: false,
        dialect: 'mysql',
        define: {
            underscored: true,
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
              collate: 'utf8_general_ci'
            },
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            idle: 3000
        }
    }
};
module.exports = config 