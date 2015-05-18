var users = { admin: {id:1, username:"admin", password:"1256"},
			  pepe: {id:2, username:"pepe", password:"pepe"}
			};

exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		}
		else{ callback(new Error('Contraseña incorrecta'));}
	}else{callback(new Error('Ese usuario no existe'));}
}