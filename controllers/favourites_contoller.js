var models = require('../models/models.js');
var quizes = [];

//PUT  /user/:userId/favourites/:quizId
exports.update = function(req, res, next){
	var quizId = req.quiz.id;
	var user = req.user;

	user.hasQuiz(quizId).then(function(result){
		if(result){
			models.favourites.findAll({where:{ UserId: Number(user.id), QuizId: Number(quizId) }});//.then(
 				//function(result) {result.destroy().then(function(){console.log("destruido")}); });
		} else {
			user.addQuiz(quizId).then(function(){
				user.hasQuiz(quizId).then(function(result){
					console.log("el" +user.id + "hizo favorita a la pregunta" + quizId + "con exito");
				})
			})
		}
		res.redirect(req.session.redir.toString());
	});

}

//DELETE /user/:userId/favourites/:quizId
exports.destroy = function(req, res){
	var quiz = req.quiz;
	var user = req.user;
	user.hasQuiz(quiz).then(function(result){
		if(result){
			user.removeQuiz(quiz).then(function(){
				user.hasQuiz(quiz).then(function(result){});
			});
		}
	res.redirect(req.session.redir.toString());
	});
}

//GET /user/:userId/favourites
exports.load = function(req, res){
	
var usuario=req.user;
	var preguntas=[];

	models.favourites.findAll({where: {
			UserId: Number(usuario.id)
		}
	}).then(function(quiz){
		for(var i in quiz){
			preguntas.push(quiz[i].QuizId);
		}

		models.Quiz.findAll({where: {
				id: preguntas
			}
		}).then(function(quizes){
			res.render('quizes/favourites.ejs', {quizes: quizes, errors: []});
		})

	})

}