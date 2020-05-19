const express = require("express")
const app = express()
const apiPort = 3000
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./db')
const projectRouter = require('./routes/project-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use('/api', projectRouter)

app.get("/users", function() {
  MongoClient.connect("mongodb://localhost:27017/main", function(err, db) {
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
app.listen(apiPort, () => console.log('Express app start on port ' + apiPort))
