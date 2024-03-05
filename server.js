const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Go to the ping route!')
})

app.get('/ping', (req, res) => {
    res.send('Hello List of Autobiographies!!')
})

app.listen(3000)

