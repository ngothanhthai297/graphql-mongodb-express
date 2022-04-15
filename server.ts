require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.URL_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.on('error', () => {
    console.log('Connect fail! ')
})

mongoose.connection.once('open', () => {
    console.log('Connect success!')
})

const appDemo = require('./app')

const server = appDemo.listen(process.env.PORT , () => console.log('Running'))

