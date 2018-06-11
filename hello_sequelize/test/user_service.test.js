/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 测试用户服务对象 User
 */
process.env.NODE_ENV = "dev"
const debug = require("debug")("service:user")
// Sequelize, sequelize 全局唯一实例
const User = require("../services/user")

const query_key = 888888

// 测试用例
describe("基于 User 表的业务逻辑", () => {

  describe("[管理员]查看用户信息", () => {
    test("#order_dao.add", () => {
      let users = User.findAll()
      debug('find %d users', users.length)
      for(let user in users) {
        console.log('user.username =', user.username)
      }
    })

})
