/**
 * (ES6)Single Instance Pattern，获得Sequelize在应用中的唯一实例
 */

const Sequelize = require('sequelize')
const config = require('../conf/orm')
const debug = require('debug')('sequelize.factory');

const Factory = {
  Sequelize,
  createSequelizeInstance() {
    if (typeof Factory.sequelize === 'undefined') {
      debug('create new instance...');
      return new Sequelize(config.database, 
          config.username, 
          config.password,
          config.option);
    }
  }
};

Factory.sequelize = Factory.createSequelizeInstance();
module.exports = Factory;