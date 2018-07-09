/**
 * Test Case based on [Jest](https://facebook.github.io/jest/docs/en/api.html)
 *
 * 基于 Sequelize 实现的 对一个表对象的增删改查操作
 */
process.env.NODE_ENV = "dev";
const debug = require("debug")("models:user")

debug("sequelize.pool = %O", Factory.sequelize.options.pool);

// 测试用例
describe("基于 Sequelize 实现的 各种表对象操作", () => {
  let user_dao;
  /**
   * 初始化测试数据：新建表，插入5条数据
   */
  beforeAll(done => {
    debug("init user_dao...");
    user_dao = Factory.getDataAcessObject("user");
    // debug('user_dao = %O', user_dao);
    // force: true will drop the table if it already exists
    try {
      user_dao.sync({ force: true }).then(() => {
        // 新建数据表，插入5条数据
        debug("user_dao.create()...");
        //测试用的数据
        const Users = ["张三", "李四", "王二", "陈武", "赵六"];
        for (let i = 0; i < 5; i++) {
          user_dao
            .create({
              username: Users[i],
              password: "pass",
              email: Users[i] + "@m.com"
            })
            .then(user => {
              debug("add user %s", user.get("username"));
            });
        }
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
    user_dao = Factory.getDataAcessObject("user");
  });

  // shutdown after all tests
  afterAll(() => {
    Factory.sequelize.close();
  });

  describe("DAO增删改查", () => {
    test("#sequelize.query 1", done => {
      debug(
        "#sequelize.query 1",
        "更多原始查询语法请参考",
        "http://docs.sequelizejs.com/manual/tutorial/raw-queries.html"
      );
      Factory.sequelize
        .query(
          "SELECT id, username, email FROM t_project_user WHERE username = :username",
          { raw: true, replacements: { username: "李四" } }
        )
        .then(myTableRows => {
          // debug('myTableRows = %O', myTableRows);
          done();
          expect(myTableRows[0][0]).toEqual({
            id: 2,
            username: "李四",
            email: "李四@m.com"
          });
        })
        .catch(err => {
          debug("sequelize.query 1 failed: ", err);
          done();
        });
    });

    test("#sequelize.query 2", done => {
      debug("#sequelize.query 2");
      Factory.sequelize
        .query("SELECT count(*) as count FROM t_project_user")
        .then(myTableRows => {
          debug("count = %d", myTableRows[0][0].count);
          done();
          //应该有5条数据
          expect(myTableRows[0][0].count).toBe(5);
        })
        .catch(err => {
          debug("sequelize.query 2 failed: ", err);
          done();
        });
    });

    test("#user_dao.query", done => {
      debug("#user_dao.query");
      user_dao
        .findOne({ where: { username: "张三" } })
        .then(user => {
          // debug('user = %O', user);
          expect(user.username).toBe("张三");
          done();
        })
        .catch(err => {
          debug("user_dao.query failed: ", err);
          done();
        });
    });

    test("#user_dao.update", done => {
      debug("#user_dao.update");

      //更新数据
      user_dao
        .update(
          {
            username: "张三三"
          },
          {
            where: {
              id: 1
            }
          }
        )
        .then(() => {
          user_dao.findById(1).then(user => {
            // debug('user = %O', user);
            expect(user.username).toBe("张三三");
          });
          done();
        })
        .catch(err => {
          debug("user_dao.update failed: ", err);
          done();
        });
    });

    test("#user_dao.delete", done => {
      user_dao
        .destroy({
          where: {
            id: 5
          }
        })
        .then(() => {
          done();
        })
        .catch(err => {
          debug("user_dao.delete failed: ", err);
          done();
        });
    });
  });
});
