var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controllers.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

/*Autoload*/
router.param('quizId', quizController.load);


/* rutas de quizes */
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.get('/quizes/answer',		   		quizController.answer);
router.put('/quizes/:quizId(\\d+)', 		quizController.update);
router.post('/quizes/create',               quizController.create);
router.delete('/quizes/:quizId(\\d+)', 		quizController.destroy);

router.get('/author', function(req, res){
	res.render("author", {errors: []})});





module.exports = router;
