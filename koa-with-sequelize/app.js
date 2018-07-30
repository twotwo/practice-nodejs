const logger = require("koa-logger")
const router = require("koa-router")()
const Koa = require("koa")
const app = new Koa()

// logger
app.use(logger())

// route definitions
router.get("/", findAll).get("/2", findAll2)

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

/**
 * only use mysql2
 */
const pool = require("mysql2/promise").createPool({
  host: process.env.DB_HOSTNAME,
  port: 3306,
  user: "node",
  password: "pD#5T~l14+,i",
  database: "test",
  connectionLimit: 150
})

async function findAll2(ctx) {
  try {
    const [rows, fields, sql] = await pool.query("SELECT id, username, password, email FROM t_project_user")
    ctx.body = { rows: rows, sql: sql }
    // const query = await pool.query("SELECT * FROM t_project_user")
    // ctx.body = { rows: query._rows, fields: query._fields, sql: query.sql }
  } catch(err) {
    console.log("caught exception!", err)
    ctx.body = err
  }
}

app.listen(3000)
