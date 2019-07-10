const express = require('express')
const path = require('path')
const app = express()
const dev = require('./dev')
const pro = require('./pro')

console.log('server running for ' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    dev(app)
} else if (process.env.NODE_ENV === 'production') {
    pro(app)
}

app.listen(8080, () => console.log('Example app listening on port 8080!'));