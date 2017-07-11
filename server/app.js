var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');


// var User = sequelize.import('./models/user.js');
var User = sequelize.import(__dirname + '\\models\\user');
User.sync(); // User.sync({ force: true}); THIS WILL DROP THE TABLE

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("app is listening on 3000");
});