var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Stone Mountain Park", image: "https://www.stonemountainpark.com/-/media/Images/HFE/SMP_COM/Hero/Mobile-Hero/mobile-hero-tentcamp.ashx"},
  {name: "Tallulah Gorge State Park", image: "http://tallulahfallsga.gov/wp-content/uploads/2016/07/riverfalls-300x234.jpg"},
  {name: "Cloudland Canyon State Park", image: "https://media.glampinghub.com/CACHE/images/accommodations/the-riverside-cabin-cabin-1479200939442/d994ab4fc2fc209b38f11c40f46db21d.jpg"}
];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
})

app.listen(3000, function(){
  console.log("The YelpCamp server has started!");
});