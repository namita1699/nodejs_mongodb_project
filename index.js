const express = require('express');
const bodypraser = require('body-parser')
const http = require("http")
const app = express();
app.use(bodypraser(bodypraser.urlencoded({ extended: true })));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "\\home.html")
})

app.get("/FindAll", function(req, res) {
    const url = "http://127.0.0.1:5000/";
    http.get(url, function(response) {
        response.on("data", function(data) {
            abc = JSON.parse(data)
            abc.forEach(element => {
                res.write("<h1>" + element.name + "</h1>")
                res.write("<img src='" + element.image + "' alt='image' Height='200px' Width='200px'/>")
                res.write("<p>" + element.summary + "</p>")
                res.write("<hr>")
            });
            res.send()

        })

    })
})
app.post("/FindSpecific", function(req, res) {
    var name = String(req.body.movie1);
    const url = "http://127.0.0.1:5000/Find?name=" + name;
    http.get(url, function(response) {
        response.on("data", function(data) {
            abc = JSON.parse(data)
            abc.forEach(element => {
                res.write("<h1>" + element.name + "</h1>")
                res.write("<img src='" + element.image + "' alt='image' Height='200px' Width='200px'/>")
                res.write("<p>" + element.summary + "</p>")
                res.write("<hr>")
            });
            res.send()

        })

    })
})

app.listen(3000, function() {
    console.log("Server starter at 3000");
})