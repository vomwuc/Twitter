/**
 * Created by Jbt on 12/7/2016.
 */

var express = require('express');
var app = express();
fs = require('fs');
app.use(express.static('public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var activeUserId = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";

app.get('/users', function (req, res) {
   fs.readFile('public/JsonsFiles/users.json', function (err,data) {
       res.writeHead(200, {'Content-Type': 'text/json'});
       res.end(data, 'utf-8');
    });
});

function getUserByIdServer(users, id){
    return users.filter(function(user){
        return user._id == id;
    });
}

app.get('/users/:id', function (req, res) {
    fs.readFile('public/JsonsFiles/users.json', function (err,data) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(getUserByIdServer(JSON.parse(data),req.params.id)), 'utf-8');
    });
});

app.get('/activeUser', function (req, res) {
    fs.readFile('./public/JsonsFiles/users.json', function (err,data) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(getUserByIdServer(JSON.parse(data), "10c06b27-d8ee-4435-9cee-0a2a838ca14a")[0]), 'utf-8');
    });
});

//
// app.post('/users/addFollowUser', function (req, res) {
//     fs.readFile('public/JsonsFiles/users.json', function (err,data) {
//         res.writeHead(200, {'Content-Type': 'text/json'});
//         var users = JSON.parse(data);
//         var activateUserUpdate = getUserByIdServer(users,activateUserId);
//         activateUserUpdate.following.push(req.body.userToFollowId);
//         fs.writeFile("public/JsonsFiles/users.json", JSON.stringify(users));
//     });
// });

function uesrInFollowees(user, checkUserId){
    return user.following.includes(checkUserId);
}

function toggleUserFolowees(user, checkUserId){
    var followUserStatus = false;

    if (uesrInFollowees(user,checkUserId)) {
        var checkUserPositionInFollowees = user.following.indexOf(checkUserId);
        if(checkUserPositionInFollowees != -1) {
            user.following.splice(checkUserPositionInFollowees, 1);
        }
    } else {
        user.following.push(checkUserId);
        followUserStatus = true;
    }

    return followUserStatus;
}

app.post('/users/ToggleUserFollowees', function (req, res) {
    fs.readFile('public/JsonsFiles/users.json', function (err,data) {
        var users = JSON.parse(data);
        var activeUser = getUserByIdServer(users,activeUserId)[0];
        var followUserStatus = toggleUserFolowees(activeUser, req.body.checkUserId);
        fs.writeFile("public/JsonsFiles/users.json", JSON.stringify(users));
        res.writeHead(200, {'Content-Type': 'boolean'});
        res.end("" + followUserStatus, 'utf-8');
    });
});

app.put('/tweets/', function (req, res) {
    fs.readFile('public/JsonsFiles/tweets.json', function (err,data) {
        var feed = JSON.parse(data);
        feed.push({text:req.body.text, user:req.body.userId});
        fs.writeFile("public/JsonsFiles/tweets.json", JSON.stringify(feed));
        res.end();
    });
});


app.get('/tweets', function (req, res) {
    fs.readFile('public/JsonsFiles/tweets.json', function (err,data) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(data, 'utf-8');
    });
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});


