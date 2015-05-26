var express = require('express');
var multer = require('multer');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers.js');
var commentController= require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statsController = require('../controllers/stats_controller');
var userController = require('../controllers/user_controller');
var favouritesController = require('../controllers/favourites_contoller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

/*Autoload de comandos*/
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);
router.param('userId', userController.load);

/* rutas de sesion */
router.get('/login', 		sessionController.new);
router.post('/login', 		sessionController.create);
router.get('/logout', 		sessionController.destroy);

/* rutas de cuenta */
router.get('/user', userController.new);
router.post('/user', userController.create);
router.get('/user/:userId(\\d+)/edit', 	sessionController.loginRequired, userController.ownershipRequired, userController.edit);
router.put('/user/:userId(\\d+)', 		sessionController.loginRequired, userController.ownershipRequired, userController.update);
router.delete('/user/:userId(\\d+)', 	sessionController.loginRequired, userController.ownershipRequired, userController.destroy);
router.get('/user/:userId(\\d+)/quizes', quizController.index);

/* rutas de quizes */
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.loginRequired, quizController.ownershipRequired, quizController.edit);
router.get('/quizes/answer',		   		quizController.answer);
router.put('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.ownershipRequired, multer({dest: './public/media/'}), quizController.update);
router.post('/quizes/create',               sessionController.loginRequired, multer({dest: './public/media/'}), quizController.create);
router.delete('/quizes/:quizId(\\d+)', 		sessionController.loginRequired, quizController.ownershipRequired, quizController.destroy);


/* rutas de comentarios */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.ownershipRequired, commentController.publish);

/* rutas de favoritos */
router.put('/user/:userId(\\d+)/favourites/:quizId(\\d+)',		 sessionController.loginRequired, favouritesController.update);
router.delete('/user/:userId(\\d+)/favourites/:quizId(\\d+)',	 sessionController.loginRequired, favouritesController.destroy);
router.get('/user/:userId(\\d+)/favourites',					 sessionController.loginRequired, favouritesController.load);


/* autores y estadisticas*/
router.get('/author', function(req, res){
	res.render("author", {errors: []})});
router.get('/quizes/stats', statsController.stats);




module.exports = router;
