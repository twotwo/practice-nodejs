const debug = require('debug')('sequelize');

//获取Sequelize单一实例
const Factory = require('./libs/sequelize_factory');
const current = Factory.sequelize;
const Sequelize = Factory.Sequelize;

//测试连接
current.authenticate().then(() => {
    debug('Connection has been established successfully.');
}).catch(err => {
    debug('Unable to connect to the database:', err);
});


// define model
const User = current.define('user', {
  username: {
    type: Sequelize.STRING(100)
  },
  password: {
    type: Sequelize.STRING(16)
  },
  email: {
    type: Sequelize.STRING(100)
  }
}, {timestamps: false});

// force: true will drop the table if it already exists
try {
  User.sync({force: false}).then(() => {
      // Table created
      return User.create({
        username: 'John',
        password: '23rwefsdaf',
        email: 'Hancock@m.com'
      });
  });
}catch(ex) {
  debug('sync(false) table');
}

// first query
User.findAll().then(users => {
  debug('findAll() count=',users.length);
  for(let user of users) {
    debug('user',user.dataValues);
  }
})

User.findOne().then(user => {
    debug('username =',user.get('username'));
  });
  