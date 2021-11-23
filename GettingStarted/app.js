const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.end('<h1>Hello world</h1>')
})
app.get('/about',(req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.write('<h2>About Page</h2>')
    res.end("<ul><li>1</li><li>2</li><li>3</li></ul>")
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!!!!')
