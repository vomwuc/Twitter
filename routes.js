/**
 * Created by Jbt on 12/7/2016.
 */


app.get('/users', function (req, res) {
    fs = require('fs')
    res.send(fs.readFile('/etc/hosts', 'utf8', function (err,data) {
        return data;
    }));
});