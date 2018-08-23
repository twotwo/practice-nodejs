const Users = [
  {
    username: '张三',
    password: 'pass',
    email: '张三@m.com'
  },
  {
    username: '李四',
    password: 'pass',
    email: '李四@m.com'
  },
  {
    username: '王二',
    password: 'pass',
    email: '王二@m.com'
  },
  {
    username: '陈武',
    password: 'pass',
    email: '陈武@m.com'
  },
  {
    username: '赵六',
    password: 'pass',
    email: '赵六@m.com'
  }
]

const debug = require('debug')('init:database:bulk')
debug.enabled = true

exports.addUsers = () => {
  const models = require('../models')
  // Sync all models that aren't already in the database
  return models.sequelize.sync().then(() => {
    return models.User.bulkCreate(Users).then(bulkInsts => {
      // array of instance
      // https://jestjs.io/docs/en/expect
      expect(bulkInsts).toHaveLength(5) // insert 5 records

      return bulkInsts.map(i => i.get())
    }).then(users => {
      debug('bulk users create %o', users)
    })
  })
}
