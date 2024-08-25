var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb+srv://devanshilahoti8228:7Ahoj6BmFNUSITPP@cluster0.myi12.mongodb.net/')
var db=mongoose.connection
db.on('error',()=>console.log("error in connecting to database"))
db.once('open',()=>console.log("connected to database"))
app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password
     var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
     }
     db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
     }
     console.log("Record Inserted successfully")
})
return res.redirect('signup_sucess.html')
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("listening on port")