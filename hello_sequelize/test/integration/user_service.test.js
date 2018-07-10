/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 测试用户服务对象 User
 */
const debug = require("debug")("integration:service:user")

let userService = require("../../services/user")

const Users = [
  {
    username: "张三",
    password: "passwd",
    email: "张三@m.com"
  },
  {
    username: "李四",
    password: "passwd",
    email: "李四@m.com"
  },
  {
    username: "王二",
    password: "passwd",
    email: "王二@m.com"
  }
]
const query_key = 888888

// 测试用例
describe("基于 User 表的业务逻辑", () => {
  beforeAll(() => {
    debug("beforeAll")
    if (process.env.NODE_ENV === "test") {
      debug("init test db")
      // Sync all models that aren't already in the database
      return require("../../models").sequelize.sync()
    }
  })
  // shutdown after all tests
  afterAll(() => {
    debug("afterAll")
  })
  describe("初始化， 注册3个以上的用户", () => {
    test("userService.signup", () => {
      return userService
        .findAll()
        .then(users => {
          debug("userService.findAll() find %d users", users.length)
          if (users.length < 3) {
            // sign up 3 users
            for (let user of Users) {
              // debug("user = %o", user)
              userService
                .signup(user.username, user.password, user.email)
                .then(user => {
                  // debug("add user %o", user)
                })
                .catch(ex => debug("Insert Failed: %s", ex.message))
            }
          }
        })
        .catch(err => {
          debug("userService.signup err = %s", err.message)
        })
    })
    test("userService.findAll", () => {
      return userService
        .findAll()
        .then(users => {
          debug("userService.findAll() find %d users", users.length)
          expect(users.length).toBeGreaterThan(3)
        })
        .catch(err => {
          debug("userService.findAll err = %s", err.message)
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
            debug("userService.findByUsername, err = %s", err.message)
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
              debug("userService.signin() user = %O", user)
              expect(user.signinTime).toBeGreaterThan(Date.now() / 1000 - 1000)
              done()
            })
            .catch(err => {
              debug("userService.signin, user = %s, err = %s", username, err.message)
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
