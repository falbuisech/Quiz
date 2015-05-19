var models = require('../models/models.js')

exports.autenticar = function(login, password, callback){
	models.User.find({
		where: {
			username: login
		}
	}).then(function(user){
		if(user){
			if(user.verifyPassword(password)){
				callback(null, user);
			}
			else{ callback(new Error('Contraseña incorrecta'));}
		}else{callback(new Error('El usuario ' + login + ' no existe'))}
	}).catch(function(error){callback(error)});

}