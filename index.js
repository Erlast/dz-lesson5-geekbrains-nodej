/**
 * Created by Женя on 19.03.2016.
 */
var todolist = require('./modules/todolist.js').todolist;

todolist.add("Задание 1");
todolist.add("Задание 2");
todolist.list();
todolist.change(1,"Задание 4");
todolist.delete(1);
todolist.complete(2);
todolist.list();