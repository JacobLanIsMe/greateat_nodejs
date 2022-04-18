var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var connection =mysql.createConnection({
    host:"127.0.0.1",
    // port:"3306",
    user:"***********",
    password:"***********",
    database:"********",
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/bulletin", function(req, res){
    res.sendFile(path.join(__dirname + "/bulletin.html"));
});
app.get("/cart", function (req, res) {
    res.sendFile(path.join(__dirname + "/cart.html"));
});
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/login.html"));
});
app.post("/login_success", function(req, res){
    connection.connect(function (err) {
        if (err) throw err;
        connection.query("SELECT password FROM customers WHERE account = ?", [req.body.login_account], function(err, results, fields){
            if (err) throw err;
            if (results[0]["password"] == req.body.login_password) {
                res.sendFile(path.join(__dirname + "/login_success.html"))
            } else {
                alert("帳號密碼輸入錯誤");
            };
        });
    }); 
});
app.get("/order", function (req, res) {
    res.sendFile(path.join(__dirname + "/order.html"));
});
app.get("/registration", function (req, res) {
    res.sendFile(path.join(__dirname + "/registration.html"));
});
app.post("/registration_success", function (req, res) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("mysql connected!");
        
        connection.query("INSERT INTO customers (account, password, name, phone, address, birth) VALUES (?, ?, ?, ?, ?, ?)", [req.body.name, req.body.password, req.body.chinesename, req.body.phone, req.body.address, req.body.birthday], function (err, result){
            if (err) throw err;
            console.log("one record inserted");
        });
    });
    res.sendFile(path.join(__dirname + "/registration_success.html"))
});
app.get("/store", function (req, res) {
    res.sendFile(path.join(__dirname + "/store.html"));
});
app.listen(8080, function(){
    console.log("http://127.0.0.1:8080")
});

