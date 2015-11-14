var express = require('express');
var app = express();
var path = require("path");

app.get('/helloworld', function (req, res) {
  res.send('Hello World!');
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('HackHarvard app listening at http://%s:%s', host, port);
});