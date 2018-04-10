/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 基于 Sequelize 实现的 对一个表对象的增删改查操作
 */
process.env.NODE_ENV = "dev";
const debug = require("debug")("dao:order");
// Sequelize, sequelize 全局唯一实例
const Factory = require("../libs/sequelize_factory");

debug("sequelize.pool = %O", Factory.sequelize.options.pool);
// order.id for unit test
const query_key = 888888;

// 测试用例
describe("基于 Sequelize 实现的 各种表对象操作", () => {
  let order_dao;

  beforeAll(done => {
    debug("init order_dao...");
    order_dao = Factory.getDataAcessObject("order");
    // debug('order_dao = %O', order_dao);
    // force: true will drop the table if it already exists
    try {
      order_dao.sync({ force: true }).then(() => {
        // 新建数据表，插入5条数据
        debug("order_dao.create()...");
        //插入测试数据
        done();
      });
    } catch (ex) {
      debug("sync(false) table");
    }
  });
  /**
   * beforeEach
   */
  beforeEach(() => {
    debug("=========");
  });

  // shutdown after all tests
  afterAll(() => {
    // debug('sequelize.pool = %O', Factory.sequelize.connectionManager.pool);
    Factory.sequelize.close();
  });

  describe("DAO增删改查", () => {
    test("#order_dao.add", done => {
      order_dao
        .create({
          id: query_key,
          uid: "boss",
          goodid: 1000,
          status: 0,
          createtime: new Date()
        })
        .then(() => {
          done();
        })
        .catch(err => {
          debug("order_dao.add failed: %o", err);
          done();
        });
    });

    test("#order_dao.query", done => {
      debug("#order_dao.query");
      order_dao
        .findOne({ where: { id: query_key } })
        .then(order => {
          // debug('order = %O', order);
          expect(order.uid).toBe("boss");
          done();
        })
        .catch(err => {
          debug("order_dao.query failed: ", err);
          done();
        });
    });

    test("#order_dao.update", done => {
      debug("#order_dao.update");
      // 更新数据
      order_dao
        .update(
          {
            uid: "张三"
          },
          {
            where: {
              id: query_key
            }
          }
        )
        .then(result => {
          debug("affectedCount = %d, affectedRows = %s", result[0], result[1]);
        })
        .then(() => {
          order_dao.findById(query_key).then(order => {
            // debug('order = %O', order);
            expect(order.uid).toBe("张三");
          });
          done();
        })
        .catch(err => {
          debug("order_dao.update failed: %O", err);
          done();
        });
    });

    test("#order_dao.delete", done => {
      order_dao
        .destroy({
          where: {
            id: query_key
          }
        })
        .then(() => {
          done();
        })
        .catch(err => {
          debug("order_dao.delete failed: ", err);
          done();
        });
    });
  });
});
