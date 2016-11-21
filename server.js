var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called addrApp
mongoose.connect('mongodb://localhost:27017/addrApp');
// Create a schema
var addrSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  addr1: String,
  addr2: String,
  updated_at: { type: Date, default: Date.now },
});
// Create a model based on the schema

var addr = mongoose.model('addr', addrSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Basic Response from the application"});
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.


router.route("/useraddr")
    .get(function(req,res){
         var response = {};
         addr.find({}, function(err,data){
         if(err) {
                response = {"error" : true, "message" : "Could not access"};
         } else {
                console.log(req.params); 
                console.log(data); 
                 response = {"error" : false,"message" : data};
         }
           res.json(response);
         });
       })

router.route("/useraddr/:id")
    .get(function(req,res){
         var response = {};
         addr.findById(req.params.id, function(err,data){
         if(err) {
                response = {"error" : true, "message" : "Could not access"};
         } else {
                console.log(req.params.id);
                console.log(data);
                response = {"error" : false,"message" : data};
         }
           res.json(response);
         });
       })



app.use('/',router);
app.listen(3000);
console.log("Listening to PORT 3000");

