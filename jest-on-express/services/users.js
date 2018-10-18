const debug = require('debug')('services:users')
const log4js = require('../utils/log4js-helper')
const log = log4js.getLogger('users')
const User = require('../models').User

/**
 * http://wiki.li3huo.com/JavaScript_Reference_Classes#Class_Declarations
 */
class Users {
  constructor () {
    log.warn('init instance')
  }

  findAll () {
    return User.findAll()
      .then(userInsts => {
        // instance array
        return userInsts.map(i => i.get())
      })
      .then(userDatas => {
        // return all users
        debug('here')
        return userDatas
      })
      .catch(err => {
        throw new Error(err.message + '@Service.user.findAll')
      })
  }
}

/**
 * [Node.js ES6 classes with require](https://stackoverflow.com/questions/42684177/node-js-es6-classes-with-require)
 */
module.exports = new Users()
