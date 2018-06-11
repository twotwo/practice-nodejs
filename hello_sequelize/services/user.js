//获取Sequelize单一实例
const Factory = require("../libs/sequelize_factory")
// define model
const user_dao = Factory.getDataAcessObject("user")
const User = {
  Factory,
  user_dao
}
const debug = require("debug")("service:user")

// User.findAll = () => {
//   return user_dao.findAll()

// }

/**
 *
 * @param {*} callback (err, users)
 */
User.findAll = callback => {
  user_dao
    .findAll()
    .then(users => {
      return callback(null, users)
    })
    .catch(err => {
      return callback(err, null)
    })
}

/**
 *
 * @param {*} username
 */
User.findByUsername = username => {
  return user_dao.findOne({ where: { username: username } })
  // return new Promise((resolve, reject) => {
  //   user_dao
  //     .findOne({ where: { username: username } })
  //     .then(user => {
  //       resolve(user)
  //     })
  //     .catch(err => {
  //       debug("User.findOne failed: username[%s], err=%O", username, err)
  //     })
  // })
}

User.update = (user, id) => {
  user_dao
    .update(user, { where: { id: id } })
    .then(user => {
      return true
    })
    .catch(err => {
      debug("user_dao.update failed: username[%s], err=%O", username, err)
      return false
    })
}

module.exports = User
