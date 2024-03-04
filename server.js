const express = require('express')

const app = express()

app.get('/ping', (req, res) => {
    res.send('Hello List of Autobiographies!!')
})

app.listen(3000)

