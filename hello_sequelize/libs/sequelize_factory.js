/**
 * (ES6)Single Instance Pattern，获得Sequelize在应用中的唯一实例
 */

const Sequelize = require('sequelize')
const config = require('../models/orm')
const debug = require('debug')('dao:factory');

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
  }, 
  /**
   * 
   * @param {*} <a href="http://docs.sequelizejs.com/class/lib/model.js~Model.html">model</a>
   */
  getDataAcessObject(model) {
    debug('get dao '+model);
    /**
     * http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import
     * 
     * import DAO Model is cached by Sequelize
     */
    return Factory.sequelize.import(model, require(`../models/${model}`));
  }
};

Factory.sequelize = Factory.createSequelizeInstance();
module.exports = Factory;