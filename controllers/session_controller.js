//Autorizacion a accesos restringidos
exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}

//GET /login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
}

//POST /login
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;
	var time = new Date();

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){//Si hay error avisa
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;
		}
		req.session.user = {id: user.id, username:user.username, time:time};
		res.redirect(req.session.redir.toString()); //Vuelve a donde estabamos antes de login
	});
}

//GET logout
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}