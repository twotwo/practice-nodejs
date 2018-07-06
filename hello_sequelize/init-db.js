const debug = require("debug")("init:database")
debug.enabled = true

debug("NODE_ENV = %s", process.env.NODE_ENV)
// process.env.NODE_ENV = "production"

debug("pls set db config in shell...")
debug(
  "export DATABASE_URL=mysql://node:pD%235T%7el14%2b%2ci@106.75.19.156:3306/test"
)

debug("NODE_ENV=production DEBUG=init:*,sql,sync,models node init-db.js")

const models = require("./models")
// log to debug
models.sequelize.options.logging = require("debug")("sql")

// sync() will create all table if they doesn't exist in database
models.sequelize
  .sync({ force: false, logging: require("debug")("sync") })
  .then(() => {
    debug("create table...")
    debug("user_dao.create()...")
    //测试用的数据
    const Users = ["张三", "李四", "王二", "陈武", "赵六"]
    for (let user of Users) {
      models.User.create({
        username: user,
        password: "pass",
        email: user + "@m.com"
      })
        .then(user => {
          debug("add user %o", user.dataValues)
        })
        .catch(ex => debug("Insert Failed: %s", ex.message))
    }
  })
  .catch(ex => {
    debug("sync failed @%O", ex)
  })

// debug("db config = %O", models.sequelize.config)
// debug("db options = %O", models.sequelize.options)
