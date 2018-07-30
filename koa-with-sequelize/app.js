const logger = require("koa-logger")
const router = require("koa-router")()
const Koa = require("koa")
const app = new Koa()

// logger
app.use(logger())

// route definitions
router.get("/", findAll)

app.use(router.routes())

/**
 * sequelize function
 * @param {*} ctx
 */
async function findAll(ctx) {
  const userInsts = await User.findAll()
  ctx.body = userInsts.map(i => i.get())
}

const User = require("./models").User

app.listen(3000)
