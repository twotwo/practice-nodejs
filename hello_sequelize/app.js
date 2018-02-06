const Sequelize = require('sequelize')
const config = require('./conf/orm')
var debug = require('debug')('sequelize');
//配置服务
const sequelize = new Sequelize(config.database, 
    config.username, 
    config.password,
    config.option);

//测试连接
sequelize.authenticate().then(() => {
    debug('Connection has been established successfully.');
}).catch(err => {
    debug('Unable to connect to the database:', err);
});


// define model
const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });
  
// force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//     // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// });

// first query
User.findAll().then(users => {
  debug('findAll() acount=',users.length);
  for(let user of users) {
    debug('user',user.dataValues);
  }
})

User.findOne().then(user => {
    debug('firstName =',user.get('firstName'));
  });
  

  

// // 映射数据库表
// var Pet = sequelize.define('pet', {
//   id: {
//     type: Sequelize.STRING(50),
//         primaryKey: true
//   },
//   name: Sequelize.STRING(100),
//     gender: Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// }, {
//   timestamps: false
// })

// // force: true 如果表已经存在，将会丢弃表
// Pet.sync({force: true}).then(() => {
//   debug('sync done');
// });


// Pet.sync().then(() => {
//   debug('sync done');
// }).catch((ex)=>{
//   debug('failed with: '+ex);
// });

// var now = Date.now();

// // 用Promise向数据库添加数据
// Pet.create({
//     id: 'g-' + now,
//     name: 'Gaffey',
//     gender: false,
//     birth: '2007-07-07',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function (p) {
//     console.log('created.' + JSON.stringify(p));
// }).catch(function (err) {
//     console.log('failed: ' + err)
// });

// // 向数据库添加数据
// (async () => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();

// // findAll方法查询数据库
// (async () => {
//     var pets = await Pet.findAll({
//         where: {
//             name: 'Gaffey'
//         }
//     });
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets) {
//         console.log(JSON.stringify(p));
//         console.log('update pet...');
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version ++;
//         await p.save();
//         if (p.version === 4) {
//           console.log('lalalalalala')
//             await p.destroy();
//             console.log(`${p.name} was destroyed.`);
//         }
//     }
// })();

//close
// debug('close connection...');
// sequelize.close().then(() => {
//     debug('Connection has been closed successfully.');
// }).catch(err => {
//     debug('Unable to close the database:', err);
// });