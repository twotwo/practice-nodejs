/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 测试用户服务对象 User
 */
process.env.NODE_ENV = "dev"
const debug = require("debug")("service:user:test")

let userService = require("../services/user")

const query_key = 888888

// 测试用例
describe("基于 User 表的业务逻辑", () => {
  beforeAll(() => {
    debug("beforeAll")
  })
  // shutdown after all tests
  afterAll(() => {
    let Factory = require("../libs/sequelize_factory")
    // debug('sequelize.pool = %O', Factory.sequelize.connectionManager.pool);
    Factory.sequelize.close()
    debug("afterAll")
  })
  describe("Service直接返回DAO方法", () => {
    test("#userService.findAll", done => {
      userService
        .findAll()
        .then(users => {
          debug("userService.findAll() find %d users", users.length)
          expect(users.length).toBeGreaterThan(3)
          for (let i = 0; i < users.length; i++) {
            debug("user.username = %s", users[i].username)
          }
          done()
        })
        .catch(err => {
          debug("userService.findAll err = %O", err)
          done()
        })
    })
  })

  describe("Promise封装的返回", () => {
    test("#userService.findByUsername", done => {
      userService
        .findByUsername("李四")
        .then(user => {
          debug('userService.findByUsername("李四") user = %O', user.dataValues)
          expect(user.username).toEqual("李四")
          done()
        })
        .catch(err => {
          debug("userService.findByUsername, err = %O", err)
          expect(err).toBeNull()
          done()
        })
    })

    // 1. 不存在的用户, 2. 正常签到， 3. 重复签到
    for (let username of ["nouser", "李四", "李四"]) {
      debug("#userService.signin ======== user = %s", username)

      test("#userService.signin", done => {
        userService
          .signin(username)
          .then(user => {
            debug("userService..signin() user = %O", user)
            expect(user.signinTime).toBeGreaterThan(Date.now() / 1000 - 1000)
            done()
          })
          .catch(err => {
            debug("userService.signin, user = %s, err = %s", username, err)
            if (username === "nouser") {
              expect(err.message).toEqual("用户不存在@nouser")
            } else if (username === "李四") {
              expect(err.message).toEqual("当日已签到@李四")
            }
            done()
          })
      })
    }
  })
})
