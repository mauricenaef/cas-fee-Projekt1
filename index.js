const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.get("/", function (req, res) {
    res.sendFile("/index.html", {root: __dirname + '/public/'});
});

app.use("/", require('./routes/noteRoutes.js'));

const hostname = '127.0.0.1';
const port = 3066;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
