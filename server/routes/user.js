var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');

router.post('/', function(req, res) {
	var username = req.body.user.username;
	var pass = req.body.user.password;
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			})
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;