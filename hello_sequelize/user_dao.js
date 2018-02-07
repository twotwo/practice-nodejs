/**
 * 参考 [Model definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
 * 
 * 本代码演示了获得DAO(Model)的三种方法
 */
const debug = require('debug')('sequelize:dao:user');

const Factory = require('./libs/sequelize_factory');
const Sequelize = Factory.Sequelize;
const sequelize = Factory.sequelize;
debug('sequelize.pool = %O', sequelize.options.pool);
debug('sequelize.define = %O', sequelize.options.define);

/**
 * 1. 直接调用sequelize.define
 */
function get_dao_define() {
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
  }, {timestamps: false});
};

/**
 * 2. 调用sequelize.define再包一层sequelize.import
 */
function get_dao_import() {
  return sequelize.import('user', (sequelize, DataTypes) => {
    debug('get_dao_import', 'cache model');
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
};

const Users = ['张三', '李四', '王二', '陈武', '赵六'];


/**
 * 3. 第二种方法的变体，model写到.js中
 */
let user_dao = sequelize.import('user', require('./models/user'));

/**
 * 4. 再进一步，包到工厂方法中
 */
// user_dao = Factory.getDataAcessObject('user');

// user_dao = get_dao_define();

// user_dao = get_dao_import();

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
    debug('user',user.username);
  }
})

user_dao.findOne().then(user => {
  if(user) {
    debug('username =',user.get('username'));
  }
});

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