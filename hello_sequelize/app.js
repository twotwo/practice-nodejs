const debug = require('debug')('sequelize');

//获取Sequelize单一实例
const Factory = require('./libs/sequelize_factory');
const Sequelize = Factory.Sequelize
const sequelize = Factory.sequelize;

//测试连接
sequelize.authenticate().then(() => {
    debug('Connection has been established successfully.');
}).catch(err => {
    debug('Unable to connect to the database:', err);
});


// define model
const user_dao = Factory.getDataAcessObject('user');

// force: true will drop the table if it already exists
try {
  user_dao.sync({force: false}).then(() => {
      // Table created
      return user_dao.create({
        username: 'John',
        password: '23rwefsdaf',
        email: 'Hancock@m.com'
      });
  });
}catch(ex) {
  debug('sync(false) table');
}

debug('user_dao = %O', user_dao);
sequelize.query("SELECT count(*) as count FROM users;").then(myTableRows => {
  debug('count =', myTableRows[0][0].count);
})

// first query
user_dao.findAll().then(users => {
  debug('findAll() count=',users.length);
  for(let user of users) {
    debug('user',user.dataValues);
  }
})

user_dao.findOne().then(user => {
    debug('username =',user.get('username'));
});

// async function wait() {
//   debug('wait for connection release...');
//   await sleep(3000);
// };
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// };
// wait();

//sync and close pool connections
sequelize.sync().then(() => {
  debug("handles before:", process._getActiveHandles().length);
  return sequelize.close().then(() => {
    debug("handles after:", process._getActiveHandles().length);
  })
})
.then(() => {
  debug('shutdown gracefully', process._getActiveHandles().length);
});