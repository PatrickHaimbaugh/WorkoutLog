var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'hguabmiah7821', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to the workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

var User = sequelize.import('./models/user');
module.exports = sequelize;