var path= require('path');

var Sequelize= require('sequelize');

//Usamos SQLite
var sequelize= new Sequelize(null,null,null,
    {dialect: 'sqlite', storage: 'quiz.sqlite'}
    );

//Importa la definicion de la tabla Quiz en quiz.js
var Quiz= sequelize.import(path.join(__dirname,'quiz'));
//Exporta la definicion de tabla Quiz
exports.Quiz= Quiz;

//Inicializa la tabla de preguntas en DB
//success(...) ejecuta el manejador cuando se crea la tabla
sequelize.sync().then(function(){
  //Devuelve numero de filas de la tabla
  Quiz.count().then(function(count){
    if(count === 0){
      //Crea pregunta predeterminada
      Quiz.create({pregunta: '¿Capital de Italia?',
      respuesta: 'Roma'
      })
      .then(function(){console.log('Base de datos inicializada correctamente')});
    };
  });
});
