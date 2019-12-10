var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;


app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/users", function() {
  MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    if (err) next
    db
      .collection("users")
      .find()
      .toArray(function(err, result) {
        if (err) throw err;

        res.json(result)
      });
  });
});
app.listen(3000,function(){
    console.log('Express app start on port 3000')
});
