var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');

router.post('/', function(req, res){
	//variables
	var description = req.body.definition.desc;
	var logType = req.body.definition.type;
	var owner = req.user.id;

	//methods
	Definition
		.create({
			description: description,
			logType: logType,
			owner: owner
		}).then(
			//createSUccess function
			function createSuccess(definition) {
				res.json({
					definition: definition
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
			//createError function
		);
});

router.get('/', function(req, res) {

	var userid = req.user.id;

	Definition
		.findAll({
			where: {owner: userid}
		}).then(
			function findAllSuccess(data){
				res.json(data);
			},
			function findAllError(err){
				res.send(500, err.message);
			}
		);
});

module.exports = router;