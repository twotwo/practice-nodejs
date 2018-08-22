const express = require('express')
const router = express.Router()
const debug = require('debug')('srv:api:users')

const User = require('../models').User

const findAll = () => {
  return User.findAll()
    .then(userInsts => {
      // instance array
      return userInsts.map(i => i.get())
    })
    .then(userDatas => {
      return userDatas
    })
    .catch(err => {
      throw new Error(err.message + '@Service.user.findAll')
    })
}

/* GET users listing. */
router.get('/', (req, res) => {
  // res.send([{ id: 1, name: 'dsf' }, { id: 2, name: 'dsf' }])
  findAll()
    .then(users => {
      res.send({users: users})
    }).catch(err => {
      res.send({err: err.message})
    })
})

router.get('/:id', (req, res) => {
  debug('url=%s', req.baseUrl)
  let id = req.params.id || ''
  debug('user id = ', id)
  if (id) {
    res.send({ id: 1, name: 'dsf' })
  } else {
    res.send([{ id: 1, name: 'dsf' }, { id: 2, name: 'dsf' }])
  }
})

module.exports = router
