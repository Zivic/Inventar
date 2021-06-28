const express = require('express')
const app = express()

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
  })

  app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
  })
  app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })

 