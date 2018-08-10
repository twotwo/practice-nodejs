/**
 * Test Case based on Jest
 *
 */
// process.env.NODE_ENV="development"
const logger = require("../utils/log4js-helper")
const log = logger.getLogger("unit:log4js")

// 测试用例
describe("log4js API testing...", () => {
  beforeAll(() => {
    logger.init()
  })
  beforeEach(() => {
    log.warn("==== %o ===", this)
  })
  // shutdown after all tests
  afterAll(() => {
    logger.warn("tear down")
  })

  describe("test configure", () => {
    test("1. call configure twice", () => {
      logger.init()
    })
  })

  describe("test layout", () => {
    test("1. layout.type=pattern", () => {
      log.debug("config env=%s", process.env.NODE_ENV)
    })
  })
})
