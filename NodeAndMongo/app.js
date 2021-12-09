const express = require('express')
const app = express()
const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb://tommy:123456abc@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/GCH0901_DB?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin'
const DATABASE_NAME = 'GCH0901_DB'

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('product')
})

app.post('/product',async (req,res)=>{
    const nameInput = req.body.txtName
    const priceInput = req.body.txtPrice
    const newP = {name:nameInput,price:priceInput}

    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    const result = await dbo.collection("Products").insertOne(newP)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
    res.redirect('/')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')