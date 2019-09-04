var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
    Campground = require("./models/campground")

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Campground.create(
//   {
//     name: "Tallulah Gorge State Park", 
//     image: "http://tallulahfallsga.gov/wp-content/uploads/2016/07/riverfalls-300x234.jpg",
//     description: "This is a state park with a huge natural gorge with a river at the bottom which you can hike to the bottom of!"
//   },
//   function(err, campground){
//     if(err){
//       console.log(err);
//     } else {
//       console.log("Newly Created Campground: ");
//       console.log(campground);
//     }
//   });



app.get("/", function(req, res){
  res.render("landing");
});

//INDEX ROUTE - Show all campgrounds
app.get("/campgrounds", function(req, res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index", {campgrounds:allCampgrounds});
    }
  });
});

//CREATE ROUTE - Add new campground to database
app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

//NEW ROUTE - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

//SHOW ROUTE - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  // Find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
        // Render show template with that campground
        res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, function(){
  console.log("The YelpCamp server has started!");
});