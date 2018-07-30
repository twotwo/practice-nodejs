'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/database.js'))[env]
const db = {}

const debug = require('debug')('models')

debug('config env= %s, dialect = %s', env, config.dialect)

if (config.use_env_variable) {
  debug(config.use_env_variable, '=', process.env[config.use_env_variable])
}

// Setup connection
const sequelize =
  typeof config.use_env_variable === 'undefined'
    ? new Sequelize(config.database, config.username, config.password, config)
    : new Sequelize(process.env[config.use_env_variable], config)

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    debug('loading %s ...', file)
    // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
    debug('import model[%s] from file[%s]', model.name, file)
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
