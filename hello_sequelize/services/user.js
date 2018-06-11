//获取Sequelize单一实例
const Factory = require('./libs/sequelize_factory');

// define model
const user_dao = Factory.getDataAcessObject('user');

User () => {

}

User.prototype.findAll =  (() => {
  user_dao.findAll().then(users => {
    return (users)
  })
  return []
})

User.prototype.findOne = ( username => {
  user_dao
    .findOne({ where: { username: username } })
    .then(user => {
      return user
    })
    .catch(err => {
      debug("user_dao.findOne failed: username[%s], err=%O", username, err);
    });
    return null
})

User.prototype.update = ((user, id) => {
  user_dao
    .update(user,
      {
        where: {
          id: id
        }
      })
    .then(user => {
      return true
    })
    .catch(err => {
      debug("user_dao.update failed: username[%s], err=%O", username, err);
      return false
    });
})

module.exports = User