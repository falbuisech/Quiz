var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers.js');
var commentController= require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statsController = require('../controllers/stats_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

/*Autoload de comandos*/
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

/* rutas de sesion */
router.get('/login', 		sessionController.new);
router.post('/login', 		sessionController.create);
router.get('/logout', 		sessionController.destroy);

/* rutas de quizes */
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.loginRequired, quizController.edit);
router.get('/quizes/answer',		   		quizController.answer);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.update);
router.post('/quizes/create',               sessionController.loginRequired, quizController.create);
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.destroy);


/* rutas de comentarios */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

/* autores y estadisticas*/
router.get('/author', function(req, res){
	res.render("author", {errors: []})});
router.get('/quizes/stats', statsController.stats);




module.exports = router;
