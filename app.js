var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    User = require("./models/user"),
    Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static( __dirname + "/public"));
seedDB();

app.get("/" , function(req , res){
   res.render("landing"); 
});

app.get("/campgrounds" , function(req , res){
   
   Campground.find({}, function(err , Allcampgrounds){
      if(err)
      {
          console.log(err);
      }else {
          res.render("campgrounds/index", {campgrounds : Allcampgrounds});
      }
   });
});

app.post("/campgrounds" , function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name : name , image : image , description : desc};
    // create a new campground and save to DB
    Campground.create(newCampground , function(err , newlyCreated){
       if(err){
           console.log(err);
       } else{
           res.redirect("/campgrounds");
       }
    });
});

app.get("/campgrounds/new" , function(req , res){
   res.render("campgrounds/new"); 
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id" , function(req , res){
   // find the campground with that id
   Campground.findById(req.params.id).populate("comments").exec(function(err , foundCampground){
       if(err){
           console.log(err);
       }else {
           // render show template with that campground
           res.render("campgrounds/show", {campground : foundCampground});
       }
   });
});

//=============================
// COMMENT ROUTES
//=============================

app.get("/campgrounds/:id/comments/new" , function(req, res) {
   // find campground by id
   Campground.findById(req.params.id , function(err , campground){
       if(err){
           console.log(err);
       }else {
           res.render("comments/new" , {campground : campground}); 
       }
   } );
});

app.post("/campgrounds/:id/comments", function(req,res){
   //Find the campground corresponding the id
   Campground.findById(req.params.id , function(err, campground) {
      if(err){
          console.log(err);
          res.redirect("/campgrounds")
      } else {
          // Create comment
          Comment.create(req.body.comment , function(err , comment){
             if(err){
                 console.log(err);
             } else {
                 // Associate the comment with the campground
                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/campgrounds/" + campground._id);
             }
          });
      }
   });
});

app.listen(process.env.PORT , process.env.IP, function(){
    console.log("Yelp Camp app is listening..");
});