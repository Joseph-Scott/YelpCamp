var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: "Stone Mountain Park", image: "https://www.stonemountainpark.com/-/media/Images/HFE/SMP_COM/Spots/Listing/listing-spot-camptentsites.ashx?h=145&w=360&la=en&hash=B0550CFF5BE7D2D84904A10D7F1AC305441E3366EFB9AF8772CAF6220662C08A"},
    {name: "Tallulah Gorge State Park", image: "http://tallulahfallsga.gov/wp-content/uploads/2016/07/riverfalls-300x234.jpg"},
    {name: "Cloudland Canyon State Park", image: "https://media.glampinghub.com/CACHE/images/accommodations/the-riverside-cabin-cabin-1479200939442/d994ab4fc2fc209b38f11c40f46db21d.jpg"}
  ]

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(){
  console.log("The YelpCamp server has started!");
});