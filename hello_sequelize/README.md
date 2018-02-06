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

[mysql2](https://www.npmjs.com/package/mysql2)

### conf/user.sql
创建测试表

### conf/orm.js

```JS
/**
 * Sequelize 带连接池的配置
 */
var config = {
    database: 'db', // 使用哪个数据库
    username: 'user', // 用户名
    password: 'pass', // 口令
    option: {
        operatorsAliases: false, //http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
        host: 'host', // 主机名
        port: 3306, // 端口号，MySQL默认3306
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
};
module.exports = config 
```


## Running Project

```bash
npm install
npm run dev
```

```mysql
mysql test> select * from pets;
+-----------------+--------+----------+------------+---------------+---------------+-----------+
| id              | name   | gender   | birth      | createdAt     | updatedAt     | version   |
|-----------------+--------+----------+------------+---------------+---------------+-----------|
| d-1517883292806 | Odie   | 0        | 2008-08-08 | 1517883292806 | 1517883292806 | 0         |
+-----------------+--------+----------+------------+---------------+---------------+-----------+
```

## Features of Sequelize

### 1. [Model definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
定义对象和表结构的映射

#### Import

```javascript
// 获取dao
const project_dao = db.import('project', require('./path/to/models/project'));

// The model definition is done in /path/to/models/project.js
sequelize.import('project', (sequelize, DataTypes) => {
  return sequelize.define("project", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  })
})
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

