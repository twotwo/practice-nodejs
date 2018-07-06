module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    // disable logging; default: console.log
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    // http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
    // with uri: mysql://user:pass@localhost:3306/database
    use_env_variable: "DATABASE_URL",
    // Options
    operatorsAliases: false, //http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
    logging: false,
    dialect: "mysql",
    define: {
      underscored: true,
      freezeTableName: false,
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci"
      },
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      idle: 3000
    }
  }
}
