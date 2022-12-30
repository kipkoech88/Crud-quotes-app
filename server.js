const express=require('express')
const bodyparser=require('body-parser')
const MongoClient=require('mongodb').MongoClient 
const ejs=require('ejs');
const { request } = require('express');




app=express();



MongoClient.connect('mongodb+srv://kipoech88:Hosea1234@cluster0.8t6s65h.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology:true
},
(err,client)=>{
    
    if(err) return console.log(err)
    console.log("Connected to Database")
    const db=client.db('star-wars-quotes')
    const quotesCollection=db.collection('quotes')

    app.set('view engine', 'ejs')
    app.engine('ejs', require('ejs').__express);

    app.use(bodyparser.urlencoded({extended:true}))
    app.use(express.static('public'))
    app.use(bodyparser.json())

    app.get('/',(req,res)=>{
        db.collection('quotes').find().toArray()
            .then(result=>{
                console.log(result)
                res.render('index.ejs',{quotes:result})
            })
            .catch(err=>{
                console.log(err)
            })
        
    })

    
    app.post('/quotes', (req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result=>{
            res.redirect('/')
        })
        .catch(err=> console.log(err))
        console.log(req.body)
    })
    app.put('/quotes',(request,res)=>{
        quotesCollection.findOneAndUpdate(
            {name:'Yoda'},
            {
                $set:{
                    name:request.body.name,
                    quote:request.body.quote
    
                }
            },
            {
                upsert :true
            },
        )
        .then(result=>{
            console.log(result)
        })
        .catch(err=>console.log(err))
        console.log(request.body)
    })
    app.delete('/quotes',(req,res)=>{
        quotesCollection.deleteOne({
            name:req.body.name
        })
        .then(result=>{
            if(result.deletedCount===0){
                res.json("There is no more quotes to delete")
            }
            res.json('Deleted Hosea Kipkoechs quote')
        })
        .catch(err=>console.log(err))
    })
    
    app.listen(3000,()=>{
        console.log("Server running on port 3000")
    })

})

