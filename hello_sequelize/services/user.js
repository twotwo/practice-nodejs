//获取Sequelize单一实例
const Factory = require("../libs/sequelize_factory")
// define model
const user_dao = Factory.getDataAcessObject("user")
const User = {
  Factory,
  user_dao
}
const debug = require("debug")("service:user")

User.findAll = () => {
  return user_dao.findAll().then(users => {
    debug("find %d users", users.length)
    return users
  })
}

/**
 *
 * @param {*} username
 */
User.findByUsername = username => {
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
  return user_dao
    .findOne({ where: { username: username } })
    .then(user => {
      if (user === null) {
        throw new Error("用户不存在@" + username)
      }

      // 1. find the user
      debug(
        "User.signin username[%s], signinTime=%d",
        user.username,
        user.signinTime
      )

      //检查签到时间
      if (user.signinTime > 0) {
        //is today?
        if (
          new Date().toDateString() ===
          new Date(user.signinTime * 1000).toDateString()
        )
          throw new Error("当日已签到@" + username)
      }
      return user
    })
    .then(user => {
      // 2. update user info: 更新签到时间和签到积分

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
          if ((affectedRows = 0)) {
            throw new Error("签到信息更新失败@" + username)
          }
          debug("User.signin update over")
        })
      return user
    })
    .then(user => {
      //3. write a signin log to db
      Factory.getDataAcessObject("user_signin_log")
        .create({
          username: user.username,
          signin_time: 123,
          score: 1
        })
        .then(log => {
          debug("User.signin add log %O", log.dataValues)
        })
      debug("User.signin over")
      // return user obj to caller
      return user.dataValues
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
