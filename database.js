var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"127.0.0.1",
    // port:"3306",
    user:"***********",
    password:"***********",
    database:"********",
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
    var sql = "CREATE TABLE customers (account VARCHAR(255), password VARCHAR(255), name VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), birth VARCHAR(255))"
    connection.query(sql, function (err, results) {
        if (err) throw err;
        console.log("Table created");
    
    });
});

// connection.end();
