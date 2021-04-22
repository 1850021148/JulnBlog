const port = 3333
const express = require('express')
const app = express()
app.use(express.static(require('path').join(__dirname,'public')))
app.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname,'./public/index/index.html'))
})
app.get('*', (req, res) => {
    res.send('<h1>404</h1>')
})
app.listen(port, () => {
    console.log(`server is running...\nport: ${port}\n`)
})