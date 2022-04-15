const express = require('express')
const app = express()
const router = require('./routers/index')

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(require('cors')());
app.use('/', router)

module.exports = app