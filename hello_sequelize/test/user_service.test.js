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
          debug("find %d users", users.length)
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
          debug("user = %O", user.dataValues)
          expect(user.username).toEqual("李四")
          done()
        })
        .catch(err => {
          expect(err).toBeNull()
          debug("userService.findByUsername, err = %O", err)
          done()
        })
    })

    test("#userService.signin", done => {
      debug("#userService.signin ========")
      userService
        .signin("李四")
        .then(result => {
          debug("result = %O", result.user.dataValues)
          expect(result.user.signinTime).toBeGreaterThan(Date.now() / 1000 - 1000)
          done()
        })
        .catch(err => {
          debug("userService.signin, err = %O", err)
          // expect(err).toBeNull()
          done()
        })
    })
  })
})
