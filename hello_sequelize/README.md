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

### 1. [Executing raw SQL queries](http://docs.sequelizejs.com/manual/installation/usage.html#executing-raw-sql-queries)

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

