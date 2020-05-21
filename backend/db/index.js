const mongoose = require('mongoose')

// DB Config
const dbValues = require("../config/keys").mongoURI;

mongoose
	.connect(dbValues, 
		{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connection successful'))
	.catch(e => {
		console.error('Connection error', e.message)
	})
const db = mongoose.connection

module.exports = db
