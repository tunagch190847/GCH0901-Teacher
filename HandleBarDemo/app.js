const express = require('express')
const app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/intro',(req,res)=>{
    const name = req.body.txtName
    const age = req.body.txtAge
    res.render('profile',{name:name,age:age})
})

app.get('/', (req,res)=>{
    const name = "Huy Hoang"
    const myEvent = new Date().toString()
    res.render('home',{userName:name,date:myEvent})
})

app.get('/intro',(req,res)=>{
    res.render('enterInfo')
})



const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running ',PORT)