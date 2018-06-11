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
  describe("[管理员]查看用户信息", () => {
    test("#userService.findAll", done => {
      userService.findAll((err, users) => {
        if (err) {
          debug("userService.findAll err = %O", err)
          return
        }
        debug("find %d users", users.length)
        for (let i = 0; i < users.length; i++) {
          debug("user.username = %s", users[i].username)
        }
        done()
      })
    })

    test("#userService.findByUsername", done => {
      // let user = userService.findOne("李四")
      // expect(user.username).toBe("李四")
      // debug("user = %O", user)

      userService.findByUsername("李四").then(user => {
        debug("user = %O", user.dataValues)
        // expect(err).toBeNull()
        expect(user.username).toEqual("李四")
        done()
      })
    })
  })
})
