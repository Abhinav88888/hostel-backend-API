const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const alert=require("alert");
const app=express();
 // require("../db/conn.js");
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(express.static("public"));
   const url="mongodb+srv://Abhinav:Abhinav888@abhinav.ci4foj9.mongodb.net/amtapiDB"
      mongoose.set('strictQuery',false);
    mongoose.connect(url,function(){
      console.log("connected");
     });
    const amountschema=new mongoose.Schema({
  id:{
    type:String,
    required:true,
     unique:true
  },
   amount:{
    type:Number,
    required:true
  }
});
const Amount=mongoose.model("amount",amountschema);

// const entry1=new Amount({
//   id:1,
//   amount:2300
// });

app.post("/",function(req,res){
  const dui=req.body.firstname;
  const amt=req.body.lastname;

  const entry1=new Amount({
    id:dui,
    amount:amt
  });
  entry1.save()
  res.redirect("/");
});

app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");
});
app.listen(3000,function(){
  console.log("server started on port 3000");
})

app.get("/delete",function(req,res){

res.sendFile(__dirname + "/delete.html");
});
app.post("/delete",function(req,res){
  const dui=req.body.firstname;
  Amount.remove({id:dui},function(err){
    if(!err){
      console.log("successfully deleted");
    };
  });

  res.redirect("/delete");
});


app.get("/update",function(req,res){

res.sendFile(__dirname + "/update.html");
});
app.post("/update",function(req,res){
  const dui=req.body.firstname;
  const amt=req.body.lastname;
Amount.findOneAndUpdate({id:dui},{amount:amt},null,function(err){
  if(!err){
    console.log("successfully updated")
  };
});
  res.redirect("/update");
});








app.get("/view",function(req,res){

res.sendFile(__dirname + "/view.html");
});
app.post("/view",function(req,res){
  const dui=req.body.firstname;
  const amt=req.body.lastname;
  Amount.findOne({id:dui},function(err,foundlist){
      if(!err){

        const viewamt=foundlist.amount
       console.log(viewamt);
       res.redirect("/view")
       alert(viewamt);

      }
    });

});
