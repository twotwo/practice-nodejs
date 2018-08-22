module.exports = {
  development: {
    username: 'node',
    password: 'pD#5T~l14+,i',
    database: 'test',
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
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
      max: 50,
      min: 0,
      idle: 3000
    }
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    operatorsAliases: false,
    // disable logging; default: console.log
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    // http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
    // with uri: mysql://user:pass@localhost:3306/database
    use_env_variable: 'DATABASE_URL',
    // Options
    operatorsAliases: false, // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
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
}
