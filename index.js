/**
 * Created by Женя on 19.03.2016.
 */
var todolist = require('./modules/todolist.js').todolist;
var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;

var app = express();

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server was running on: ", host, port);
});

app.engine('hbs', template);
app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    todolist.list(function (result) {
        res.render('index', {'result': result});
    })
});

app.get('/add', function (req, res) {
    todolist.add("Задание");
    res.redirect("/");
})

app.get('/delete', function (req, res) {
    todolist.delete(req.query.id);
    res.redirect("/");
})

app.get('/complete', function (req, res) {
    todolist.complete(req.query.id);
    res.redirect("/");
})

app.get('/change',function (req,res) {
    todolist.change(req.query.id,"Задание "+req.query.id);
    res.redirect("/");
})
// todolist.change(1,"Задание 4");
//
//
// todolist.list();