const debug = require('debug')('sequelize:dao:user');

const Factory = require('./libs/sequelize_factory');
const Sequelize = Factory.Sequelize;
const sequelize = Factory.sequelize;
debug('sequelize.pool = %O', sequelize.options.pool);
debug('sequelize.define = %O', sequelize.options.define);

const Users = ['张三', '李四', '王二', '陈武', '赵六'];

const user_dao = sequelize.import('user', (sequelize, DataTypes) => {
  return sequelize.define('user', {
    username: {
      type: Sequelize.STRING(100)
    },
    password: {
      type: Sequelize.STRING(16)
    },
    email: {
      type: Sequelize.STRING(100)
    }
  }, {timestamps: false})
});

// force: true will drop the table if it already exists
// try {
//   user_dao.sync({force: true}).then(() => {
//       // Table created
//       return user_dao.create({
//         username: 'John',
//         password: '23rwefsdaf',
//         email: 'Hancock@m.com'
//       });
//   });
// }catch(ex) {
//   debug('sync(false) table');
// }

debug('user_dao = %O', user_dao);
sequelize.query("SELECT count(*) FROM users;").then(myTableRows => {
  debug('myTableRows', myTableRows);
})

// first query
user_dao.findAll().then(users => {
  debug('findAll() count=',users.length);
  //如果数据少于5条，就新建补满5条数据
  if(users.length<5) {
    debug('user_dao.create()...');
    for(let i=users.length; i<5; i++) {
      let ret = user_dao.create({username: Users[i], password: 'pass', email: Users[i]+'@m.com'});
      debug('%d ret = %S', i, ret);
    }
  }
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