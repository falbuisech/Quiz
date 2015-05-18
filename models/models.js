var path= require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url      = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize= require('sequelize');

// BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    { dialect: dialect,
      protocol: protocol,
      port: port,
      host: host,
      storage: storage,
      omitNull: true
    }
);

//Importa la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz= sequelize.import(quiz_path);

//Importa la definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

//Relacionamos tablas 1 a N
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Exporta la definicion de tabla Quiz y de tabla Comment
exports.Quiz = Quiz;
exports.Comment = Comment;

//Inicializa la tabla de preguntas en DB
//success(...) ejecuta el manejador cuando se crea la tabla
sequelize.sync().then(function(){
  //Devuelve numero de filas de la tabla
  Quiz.count().then(function(count){
    if(count === 0){
      // Crea pregunta predeterminada
         Quiz.create({pregunta: '¿Capital de Italia?',
              respuesta: 'Roma'
        });
         Quiz.create({pregunta: '¿Capital de Portugal?',
	      respuesta: 'Lisboa'
    }) .then(function(){console.log('Base de datos inicializada correctamente')});
    };
  });
});
