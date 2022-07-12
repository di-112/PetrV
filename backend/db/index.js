const knex = require('./knex')

const TABLE = 'PLANNING'

const getUser = async token => {
  const user = await knex(TABLE).where('token', token)

  return user
}

const addUser = async user => {
  await knex(TABLE).insert({
    token: user.token, apiKey: user.token, taskTracker: user.taskTracker,
  })
}

module.exports = {
  getUser,
  addUser,
}
