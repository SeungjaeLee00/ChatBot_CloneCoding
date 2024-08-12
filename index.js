const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('챗봇 사이트 만들기 시작')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})