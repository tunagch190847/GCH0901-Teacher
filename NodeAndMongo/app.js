const express = require('express')
const app = express()
const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb://tommy:123456abc@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/GCH0901_DB?replicaSet=Cluster0-shard-0&ssl=true&authSource=admin'
const DATABASE_NAME = 'GCH0901_DB'

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/insert',(req,res)=>{
    res.render('product')
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    console.log("id can xoa:"+ id)
    const dbo = await getDatabase()
    await dbo.collection("Products").deleteOne({_id:ObjectId(id)})
    res.redirect('/view')
})

app.get('/view',async (req,res)=>{
    //1. lay du lieu tu Mongo
    const dbo = await getDatabase()
    const results = await dbo.collection("Products").find({}).sort({name:1}).limit(7).toArray()
    //2. hien thi du lieu qua HBS
    res.render('view',{products:results})
})

app.post('/product',async (req,res)=>{
    const nameInput = req.body.txtName
    const priceInput = req.body.txtPrice
    const picURLInput = req.body.txtPicURL
    if(isNaN(priceInput)==true){
        //Khong phai la so, bao loi, ket thuc ham
        const errorMessage = "Gia phai la so!"
        const oldValues = {name:nameInput,price:priceInput,picURL:picURLInput}
        res.render('product',{error:errorMessage,oldValues:oldValues})
        return;
    }
    const newP = {name:nameInput,price:Number.parseFloat(priceInput),picURL:picURLInput}

    const dbo = await getDatabase()
    const result = await dbo.collection("Products").insertOne(newP)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
    res.redirect('/')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL)
    const dbo = client.db(DATABASE_NAME)
    return dbo
}
