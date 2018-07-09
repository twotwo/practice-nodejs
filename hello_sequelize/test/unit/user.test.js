/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 基于 Sequelize 实现的 对一个表对象的增删改查操作
 * 
 * DEBUG=init:*,models,unit:* jest test/unit/user.test.js
 */
//http://docs.sequelizejs.com/class/lib/model.js~Model.html
const debug = require("debug")("unit:models:user")

const Users = [
  {
    username: "张三",
    password: "pass",
    email: "张三@m.com"
  },
  {
    username: "李四",
    password: "pass",
    email: "李四@m.com"
  },
  {
    username: "王二",
    password: "pass",
    email: "王二@m.com"
  },
  {
    username: "陈武",
    password: "pass",
    email: "陈武@m.com"
  },
  {
    username: "赵六",
    password: "pass",
    email: "赵六@m.com"
  }
]

// 测试用例
describe("Sequelize User Model", () => {
  /**
   * 初始化测试数据：新建表，插入5条数据
   */
  beforeAll(() => {
    // Sync all models that aren't already in the database
    return require("../../models")
      .sequelize.sync()
      .then(() => {
        this.User = require("../../models").User
        return this.User.bulkCreate(Users).then(results => {
          // debug("bulk create %O", results)
          // https://jestjs.io/docs/en/expect
          expect(results).toHaveLength(5) // insert 5 records
          return results
        })
      })
  })

  beforeEach(() => {
    this.User = require("../../models").User
  })

  // truncate all records in Users
  afterAll(() => {
    return this.User.truncate().then(() => {
      return require("../../models").sequelize.close()
    })
  })

  describe("User Model Options", () => {
    test("#user_dao.query", done => {
      debug("#user_dao.query")
      this.User.findOne({ where: { username: "张三" } })
        .then(user => {
          // debug('user = %O', user);
          expect(user.username).toBe("张三")
          done()
        })
        .catch(err => {
          debug("user_dao.query failed: ", err)
          done()
        })
    })

    test("#user_dao.update", done => {
      debug("#user_dao.update")

      //更新数据
      this.User.update({ username: "张三三" }, { where: { id: 1 } })
        .bind(this)
        .then(() => {
          this.User.findById(1).then(user => {
            // debug('user = %O', user);
            expect(user.username).toBe("张三三")
          })
          done()
        })
        .catch(err => {
          debug("user_dao.update failed: ", err)
          done()
        })
    })

    test("#user_dao.delete", done => {
      this.User.destroy({ where: { id: 5 } })
        .then(() => {
          done()
        })
        .catch(err => {
          debug("user_dao.delete failed: ", err)
          done()
        })
    })
  })
  describe("Sequelize query ... don't use in normal action", () => {
    test("#sequelize.query 1", done => {
      debug(
        "#sequelize.query 1",
        "更多原始查询语法请参考",
        "http://docs.sequelizejs.com/manual/tutorial/raw-queries.html"
      )
      this.User.sequelize
        .query(
          "SELECT id, username, email FROM t_project_user WHERE username = :username",
          { raw: true, replacements: { username: "李四" } }
        )
        .then(myTableRows => {
          // debug('myTableRows = %O', myTableRows);
          done()
          expect(myTableRows[0][0]).toEqual({
            id: 2,
            username: "李四",
            email: "李四@m.com"
          })
        })
        .catch(err => {
          debug("sequelize.query 1 failed: ", err)
          done()
        })
    })

    test("#sequelize.query 2", done => {
      debug("#sequelize.query 2")
      this.User.sequelize
        .query("SELECT count(*) as count FROM t_project_user")
        .then(myTableRows => {
          debug("count = %d", myTableRows[0][0].count)
          done()
          //应该有5条数据
          expect(myTableRows[0][0].count).toBe(5)
        })
        .catch(err => {
          debug("sequelize.query 2 failed: ", err)
          done()
        })
    })
  })
})
