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

// /**
//  *
//  * @param {*} callback (err, users)
//  */
// User.findAll = callback => {
//   user_dao
//     .findAll()
//     .then(users => {
//       return callback(null, users)
//     })
//     .catch(err => {
//       return callback(err, null)
//     })
// }

User.findAll = () => {
  return user_dao.findAll()
}

/**
 *
 * @param {*} username
 */
User.findByUsername = username => {
  // return user_dao.findOne({ where: { username: username } })
  return new Promise((resolve, reject) => {
    user_dao
      .findOne({ where: { username: username } })
      .then(user => {
        // throw new Error('test')
        resolve(user)
      })
      .catch(err => {
        // debug("User.findOne failed: username[%s], err=%O", username, err)
        reject(err)
      })

    // xx_dao.action
  })
}

/**
 * 用户签到业务逻辑
 * @param {*} username
 * @return {code: 0-成功/>0-业务错误码/<0-程序异常, msg: '提示信息', err - 错误对象}
 */
User.signin = username => {
  return new Promise((resolve, reject) => {
    // 1. find the user
    user_dao
      .findOne({ where: { username: username } })
      .then(user => {
        if (user === null) {
          reject({
            code: 404,
            msg: "用户不存在@" + username
          })
        }
        // 2. update user info
        //检查签到时间
        if (user.signinTime > 0) {
          debug(
            "User.signin username[%s], signinTime=%d",
            user.username,
            user.signinTime
          )
          //is today?
          if (
            new Date().toDateString() ===
            new Date(user.signinTime * 1000).toDateString()
          )
            reject({
              code: 440,
              msg: "can't sign in twice a day!"
            })
        }

        user.signinTime = (Date.now() / 1000) << 0
        user.score = user.score + 1
        //http://docs.sequelizejs.com/manual/tutorial/instances.html#working-in-bulk-creating-updating-and-destroying-multiple-rows-at-once-
        user_dao
          .update(
            { signinTime: user.signinTime, score: user.score },
            { where: { id: user.id }, returning: true }
          )
          .spread((affectedCount, affectedRows) => {
            debug(
              "user_dao.update affectedCount=%d, affectedRows=%d",
              affectedCount,
              affectedRows
            )
            if (affectedRows > 0) {
              // debug("user = %O", user.dataValues)
              //3. write a signin log to db
              // ..
              // debug("user = %O", user.dataValues)
              resolve({
                code: 0,
                msg: "sign-in ok!",
                user
              })
            } else {
              reject({
                code: 440,
                msg: "can't record data!"
              })
            }
          })
          .catch(err => {
            debug("user_dao.update failed: username[%s], err=%O", username, err)
            reject({
              code: -1,
              msg: "error@user_dao.update",
              err
            })
          })
      })
      .catch(err => {
        // debug("User.signin failed: username[%s], err=%O", username, err)
        reject({ code: -1, msg: "error@User.signin", err })
      })
  })
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
