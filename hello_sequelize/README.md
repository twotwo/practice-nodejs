# hello_sequelize

Getting started with [Sequelize](http://wiki.li3huo.com/NodeJS_ORM_Solutions#Sequelize).

## Generate Project

```bash
➜  hello_sequelize git:(master) ✗ npm init
...
➜  hello_sequelize git:(master) ✗ npm install --save sequelize mysql2
npm notice created a lockfile as package-lock.json. You should commit this file.
+ mysql2@1.5.1
+ sequelize@4.32.3
added 50 packages in 7.907s
➜  hello_sequelize git:(master) ✗ npm i debug --save-dev
+ debug@3.1.0
updated 1 package in 1.523s
```

* [sequelize](https://www.npmjs.com/package/sequelize)
* [mysql2](https://www.npmjs.com/package/mysql2)

### 1. conf/orm.js
ORM配置文件，包括数据库、连接池和Sequelize的一些设置

```JS
/**
 * Sequelize 带连接池的配置
 */
var config = {
    database: 'test', // 使用哪个数据库
    username: 'test', // 用户名
    password: 'test', // 口令
    option: {
        operatorsAliases: false, //http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
        host: 'localhost', // 主机名
        port: 3306, // 端口号，MySQL默认3306
        logging: false,
        dialect: 'mysql',
        define: {
            underscored: true,
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
              collate: 'utf8_general_ci'
            },
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
};
module.exports = config
```
### 2. conf/*.sql
真实表结构，正式项目不建议用sync({force: true})方式自动创建表结构

### 3. models/*.js
表对象映射文件，与对应conf/*.sql 一一对应

### 4. test/sequelize_user.test.js
t_project_user的增删改查操作

## Running Project

```bash
npm install
npm run test or
DEBUG=sequelize:dao:* jest test/sequelize_user.test.js
```

```mysql
mysql test> select * from t_project_user
+------+------------+------------+------------+
| id   | username   | password   | email      |
|------+------------+------------+------------|
| 1    | 张三       | pass       | 张三@m.com |
| 2    | 李四       | pass       | 李四@m.com |
| 3    | 王二       | pass       | 王二@m.com |
| 4    | 陈武       | pass       | 陈武@m.com |
| 5    | 赵六       | pass       | 赵六@m.com |
+------+------------+------------+------------+
```

## Features of Sequelize

### 1. [Model definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
定义对象和表结构的映射

#### Import

```javascript
// 获取dao
const user_dao = sequelize.import('user', require('../models/user'));

// The model definition is done in /path/to/models/user.js
module.exports = (sequelize) => {
    return sequelize.define("user", {}, {
      //不添加创建、更新时间戳
      timestamps: false,
      //使用下划线命名法
      underscored: true,
      //不自动修改表名
      freezeTableName: true,
      // define the table's name
      tableName: 't_project_user'
    })
  };
```

#### Configuration

```javascript
const Bar = sequelize.define('bar', { /* bla */ }, {
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of table names; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'my_very_custom_table_name',

  // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  // to the model and throw an OptimisticLockingError error when stale instances are saved.
  // Set to true or a string with the attribute name you want to use to enable.
  version: true
});
```

### 2. [Executing raw SQL queries](http://docs.sequelizejs.com/manual/installation/usage.html#executing-raw-sql-queries)

```javascript
sequelize
  .query(
    'SELECT * FROM projects WHERE status = :status ',
    { raw: true, replacements: { status: 'active' } }
  )
  .then(projects => {
    console.log(projects)
  });

  sequelize
  .query('SELECT * FROM projects', { model: Projects })
  .then(projects => {
    // Each record will now be mapped to the project's model.
    console.log(projects)
  });
```

### 3. [Querying](http://docs.sequelizejs.com/manual/tutorial/querying.html)
增删改查等常见操作： .create/.destroy/.update/.find*

```javascript
// search for known ids
User.findById(123).then(user => {
  // user will be an instance of User and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
})

// search for attributes
User.findOne({ where: {username: '张三'} }).then(user => {
  // user will be the first entry of the Users table with the username '张三' || null
})


Post.findAll({
  where: {
    [Op.or]: [{authorId: 12}, {authorId: 13}]
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

Post.findAll({
  where: {
    authorId: {
      [Op.or]: [12, 13]
    }
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

Post.destroy({
  where: {
    status: 'inactive'
  }
});
// DELETE FROM post WHERE status = 'inactive';

Post.update({
  updatedAt: null,
}, {
  where: {
    deletedAt: {
      [Op.ne]: null
    }
  }
});
// UPDATE post SET updatedAt = null WHERE deletedAt NOT NULL;
```