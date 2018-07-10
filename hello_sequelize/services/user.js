const User = require("../models").User
const SigninLog = require("../models").SigninLog

const debug = require("debug")("service:user")

module.exports = Service = {}

Service.findAll = () => {
  return User.findAll().then(users => {
    debug("find %d users", users.length)
    return users
  })
}

/**
 *
 * @param {*} username
 */
Service.findByUsername = username => {
  return User.findOne({ where: { username: username } })
}

/**
 * 用户注册
 * 
 * @param {*} username 
 * @param {*} password 
 * @param {*} email 
 */
Service.signup = (username, password, email) => {
  if(!password || password.length <6) {
    throw new Error("密码太短！")
  }
  return User.findOne({ where: { username: username } })
    .then(user => {
      if (user) {
        throw new Error("用户名已存在@" + username)
      }
    }).then (()=> {
      return User.create({ username, password, email }).then(user => {
        debug("Service.signup user=%O", user.dataValues)
        // return user obj to caller
        return user.dataValues
      })
    })
}

/**
 * 用户签到
 * @param {*} username
 * @return {code: 0-成功/>0-业务错误码/<0-程序异常, msg: '提示信息', err - 错误对象}
 */
Service.signin = username => {
  return User.findOne({ where: { username: username } })
    .then(user => {
      if (user === null) {
        throw new Error("用户不存在@" + username)
      }

      // 1. find the user
      debug("Service.signin username[%s], signinTime=%d", user.username, user.signinTime)

      //检查签到时间
      if (user.signinTime > 0) {
        //is today?
        if (new Date().toDateString() === new Date(user.signinTime * 1000).toDateString()) throw new Error("当日已签到@" + username)
      }
      return user
    })
    .then(user => {
      // 2. update user info: 更新签到时间和签到积分

      user.signinTime = (Date.now() / 1000) << 0
      user.score = user.score + 1
      //http://docs.sequelizejs.com/manual/tutorial/instances.html#working-in-bulk-creating-updating-and-destroying-multiple-rows-at-once-
      User
        .update(
          { signinTime: user.signinTime, score: user.score },
          { where: { id: user.id }, returning: true }
        )
        .spread((affectedCount, affectedRows) => {
          debug(
            "User.update affectedCount=%d, affectedRows=%d",
            affectedCount,
            affectedRows
          )
          if ((affectedRows = 0)) {
            throw new Error("签到信息更新失败@" + username)
          }
          debug("Service.signin update over")
        })
      return user
    })
    .then(user => {
      //3. write a signin log to db
      return SigninLog.create({
        username: user.username,
        signin_time: 123,
        score: 1
      }).then(log => {
        debug("Service.signin add log %O", log.dataValues)
        // return user obj to caller
        return user.dataValues
      })
      debug("Service.signin over")
    })
}

Service.update = (user, id) => {
  User.update(user, { where: { id: id } })
    .then(user => {
      return true
    })
    .catch(err => {
      debug("User.update failed: username[%s], err=%O", username, err)
      return false
    })
}

