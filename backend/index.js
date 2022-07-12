const express = require('express')
const cors = require('cors')
const db = require('./db')

const PORT = 5050

const app = express()

app.use(cors())
app.use(express.json())

app.use((error, req, res, next) => {
  res.status(error.status)

  res.send({
    status: error.status,
    message: error.message,
    stack: error.stack,
  })
})

app.post('/users', async (req, res) => {
  try {
    await db.addUser(req.body.user)
    res.status(200).send({
      success: true,
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})

app.get('/users', async (req, res) => {
  try {
    console.log('req.params: ', req.query)
    const data = await db.getUser(req.query.token)
    res.send({
      ...data[0],
    })
  } catch (error) {
    res.status(400).send({
      error: error.message,
    })
  }
})

module.exports = {
  server: app,
}
