/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 基于 Sequelize 实现的 对一个表对象的增删改查操作
 */
const debug = require("debug")("unit:models:order")

// order.id for unit test
const query_key = 888888

// 测试用例
describe("基于 Sequelize 实现的 各种表对象操作", () => {
  beforeAll(() => {
    // Sync all models that aren't already in the database
    return require("../../models").sequelize.sync()
  })
  /**
   * beforeEach
   */
  beforeEach(() => {
    this.Order = require("../../models").Order
  })

  // shutdown after all tests
  afterAll(() => {
    // debug('sequelize.pool = %O', Factory.sequelize.connectionManager.pool);
    require("../../models").sequelize.close()
  })

  describe("DAO增删改查", () => {
    test("#Order.add", done => {
      this.Order.create({
        id: query_key,
        uid: "boss",
        goodid: 1000,
        status: 0,
        createtime: new Date()
      })
        .then(() => {
          done()
        })
        .catch(err => {
          debug("Order.add failed: %o", err)
          done()
        })
    })

    test("#Order.query", done => {
      debug("#Order.query")
      this.Order.findById(query_key)
        // this.Order.findOne({ where: { id: query_key } })
        .then(order => {
          // debug('order = %O', order);
          expect(order.uid).toBe("boss")
          done()
        })
        .catch(err => {
          debug("Order.query failed: ", err)
          done()
        })
    })

    test("#Order.update", done => {
      debug("#Order.update")
      // 更新数据
      this.Order.update(
        { uid: "张三", paytime: new Date() },
        { where: { id: query_key } }
      )
        .then(result => {
          debug("affectedCount = %d, affectedRows = %s", result[0], result[1])
          expect(result[0]).toBe(1)
        })
        .then(() => {
          this.Order.findOne({ where: { id: query_key } }).then(order => {
            if (order) {
              debug("order = %O", order.dataValues)
              expect(order.uid).toBe("张三")
            }
          })
          done()
        })
        .catch(err => {
          debug("Order.update failed: %O", err)
          done()
        })
    })

    test("#Order.delete", done => {
      this.Order.destroy({
        where: {
          id: query_key
        }
      })
        .then(() => {
          done()
        })
        .catch(err => {
          debug("Order.delete failed: ", err)
          done()
        })
    })
  })
})
