/**
 * Created by Женя on 19.03.2016.
 */
var config = require("../config/config.js").config;
var mysql = require("mysql");

var connectionPool = mysql.createPool(config);

var todolist = {
    list: function (callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                console.error(err);
            var i = 0;
            connection.query('select * from taskes;', function (err, rows) {
                i++;
                console.log('Запись ' + i + ': ', rows);
                connection.release();
            });
        });
    },
    add: function (task, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                console.error(err);

            connection.query('insert into tasks (task,complete) values (' + task + ',"false");', function (err, rows) {
                console.log('Запись успешно добалена ');
                connection.release();
            });
        });
    },
    change: function (id, task, callback) {
        connectionPool.getConnection(function (err, connection) { // gets connection
            if (err) console.error(err); // checks and logs errors
            var query = connection.query('UPDATE tasks SET task = ? WHERE id = ?;', [task, id], function (err, rows) {
                if (err)
                    console.error(err);
            });
            connection.release(); // releases connection
        });
    },
    complete: function (id, callback) {
        connectionPool.getConnection(function (err, connection) { // gets connection
            if (err) console.error(err); // checks and logs errors
            var query = connection.query('UPDATE tasks SET complete = "true" WHERE id = ?;', [id], function (err, rows) {
                if (err)
                    console.error(err);
            });
            connection.release(); // releases connection
        });
    },
    delete: function (id, callback) {
        connectionPool.getConnection(function (err, connection) { // gets connection
            if (err) console.error(err); // checks and logs errors
            var query = connection.query('DELETE from tasks WHERE id = ?;', [id], function (err, rows) {
                if (err)
                    console.error(err);
            });
            connection.release(); // releases connection
        });
    }
};
module.exports.todolist = todolist