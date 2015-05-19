var models = require('../models/models.js');

exports.stats = function (req,res) {
	models.Quiz.findAll({include:[{model: models.Comment
	}]}).then(function(preguntas){
		models.Comment.count().then(function(comments){
			var preg = preguntas.length;
			var media = comments/preg;
			var wComment=0;
			for(i=0; i<preg; i++){
				if(preguntas[i].Comments.length>0){
					wComment++;
				}
			}
			var noComment= preg - wComment;
			res.render('stats', {preg:preg, comments: comments, media:media, wComment: wComment, noComment:noComment, errors:[]});
		});
	});
}
