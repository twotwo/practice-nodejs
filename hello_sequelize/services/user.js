const User = require("../models").User
const SigninLog = require("../models").SigninLog

const debug = require("debug")("service:user")

module.exports = Service = {}

Service.findAll = () => {
  return User.findAll()
    .then(userInsts => {
      // instance array
      return userInsts.map(i => i.get())
    })
    .then(userDatas => {
      debug("User.findAll() find %d users", userDatas.length)
      return userDatas
    })
    .catch(err => {
      throw new Error(err.message + "@Service.user.findAll")
    })
}

/**
 *
 * @param {*} username
 */
Service.findByUsername = username => {
  return User.findOne({ where: { username: username } })
    .then(userInst => {
      if (userInst === null) {
        throw new Error("用户名不存在@" + username)
      }
      return userInst.get()
    })
    .catch(err => {
      throw new Error(err.message + "@Service.user.findByUsername")
    })
}

/**
 * 用户注册
 *
 * @param {*} username
 * @param {*} password
 * @param {*} email
 */
Service.signup = (username, password, email) => {
  if (!password || password.length < 6) {
    throw new Error("密码太短！")
  }
  return User.findOne({ where: { username: username } })
    .then(userInst => {
      if (userInst) {
        throw new Error("用户名已存在@" + username)
      }
    })
    .then(() => {
      return User.create({ username, password, email }).then(userInst => {
        debug("signup user=%O", userInst)
        // return user obj to caller
        return userInst.get()
      })
    })
    .catch(err => {
      debug("signup failed: username[%s], err=%O", username, err)
      throw new Error(err.message + "@Service.user.signup")
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
      debug(
        "Service.signin username[%s], signinTime=%d",
        user.username,
        user.signinTime
      )

      //检查签到时间
      if (user.signinTime > 0) {
        //have signin today?
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
      User.update(
        { signinTime: user.signinTime, score: user.score },
        { where: { id: user.id }, returning: true }
      ).spread((affectedCount, affectedRows) => {
        debug(
          "user.update affectedCount=%d, affectedRows=%d",
          affectedCount,
          affectedRows
        )
        if ((affectedRows = 0)) {
          throw new Error("签到信息更新失败@" + username)
        }
      })
      return user
    })
    .then(userInst => {
      //3. write a signin log to db
      return SigninLog.create({
        username: userInst.username,
        signin_time: userInst.signinTime,
        score: 1
      })
        .then(logInst => {
          debug("Service.signin add log %o", logInst.get())
          // return user data to caller
          return userInst.get()
        })
        .catch(err => {
          throw new Error("failed to add log: " + err.message)
        })
    })
    .catch(err => {
      // debug("Service.signin failed: username[%s], err=%O", username, err)
      throw new Error(err.message + "@Service.user.signin")
    })
}

Service.update = (user, id) => {
  User.update(user, { where: { id: id } })
    .then(user => {
      return true
    })
    .catch(err => {
      debug("User.update failed: username[%s], err=%O", username, err)
      throw new Error(err.message + "@Service.user.update")
    })
}
