/**
 * Created by Jbt on 12/7/2016.
 */

var express = require('express');
var app = express();

app.use(express.static('public'))

app.get('/users', function (req, res) {
   fs.readFile('public/JsonsFiles/users.json', function (err,data) {
       res.writeHead(200, {'Content-Type': 'text/json'});
       res.end(data, 'utf-8');
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});


