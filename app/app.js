var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var routes = require('./routes');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});