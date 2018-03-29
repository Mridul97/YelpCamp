var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's rest",
            image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg",
            description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus "
        },
        {
            name: "Mount Abu",
            image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg",
            description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus "
        },
        {
            name: "Trees magic",
            image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__480.jpg",
            description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus "
        }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Campgrounds Removed");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed , function(err , campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // create a comment
                        Comment.create(
                            {
                                text:"This place is great but I wish there was internet connectivity.",
                                author:"Horace"
                            }, function(err , comment){
                                if(err){
                                    console.log(err);
                                }else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            }
                        )
                    }
                });
            });
        }
    });
    

    // add a few comments
    
}

module.exports = seedDB;
