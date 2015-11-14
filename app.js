var express = require('express');
var app = express();
var path = require("path");

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'Jy4IWIkTC3jzyvheRv1fbwIdM',
  consumer_secret: 'fC7bA2OoyK6Uk8jCUE8BSJluWOGefgpX8lnp33hTeoPJvS2Z25',
  access_token_key: '1433449044-yGZuglyaUeOkhjj6m15SbQzYbT525uRjDElWGE0',
  access_token_secret: 'uovmu4FNe01uLl4fhwdzquMFQZQuY6L0BthHr7sWx5W0z'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});

client.get('favorites/list', function(error, tweets, response){
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  console.log(response);  // Raw response object. 
});


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