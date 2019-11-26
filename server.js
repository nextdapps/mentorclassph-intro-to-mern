'use strict'
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
// const port = process.env.PORT
const port = 7000

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URL, mongoOptions)

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String }
})

const User = mongoose.model('User', userSchema)

// ROUTING
// REQUEST
// RESPONSE

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.route('/users')
  .get(async(req, res) => {
    const users = await User.find({})
    return res.json({ status: true, users })
  })
  .post(async(req, res) => {
    const { firstname, lastname } = req.body
    const user = await User.create({ firstname, lastname })
    return res.json({ status: true, user })
  })

// app.get('/users/:firstname', (req, res) => {
//   const { firstname } = req.params
//   return res.json({ status: true, firstname })
// })
//
// app.get('/whatever', (req, res) => {
//   return res.sendFile(__dirname + '/index.html')
//   // return res.redirect('/thank-you')
// })
//
// app.get('/thank-you', (req, res) => {
//   // return res.send('Thank you MERN guys')
// })
//
// app.post('/search', (req, res) => {
//   const data = req.body
//   const path = req.path
//
//   if (req.is('application/json')) {
//     return res.json({
//       status: true,
//       message: 'JSON DATA',
//       data
//     })
//   } else {
//     return res.json({
//       status: true,
//       message: 'URL ENCODED DATA',
//       data
//     })
//   }
//
// })

app.get('/', (req, res) => {
  const { search } = req.query
  return res.json({ status: true, search })
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
