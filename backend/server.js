const express = require("express")
const app = express()
const apiPort = 4000
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./db')

const passport = require('passport')
const session = require('express-session')

const projectRouter = require('./routes/project-router')
const validationRouter = require('./routes/validation-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(session({
  secret: 'sessionSecret',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize())
require('./config/passport')(passport)
app.use('/api/users', validationRouter)
app.use(passport.session())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  res.locals.loggedIn = req.isAuthenticated()
  next()
})


app.get("/", function(req, res) {
  res.send("Backend API Main Page");
});

app.use('/api', projectRouter)

app.listen(apiPort, () => console.log('Express app start on port ' + apiPort))
