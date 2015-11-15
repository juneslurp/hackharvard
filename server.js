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

// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');

// var url = 'mongodb://localhost:27017/test';
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });
 
// app.get('/',function(req,res){
//     var ret = "";
//     var params = {
//         q: 'flu',
//         lang:'en',
//         result_type: 'recent',
//         geocode:'39.828282,-98.579555,1400mi'
//     };

//     client.get('search/tweets', params, function(error, tweets, response){
//         console.log(tweets);
//         for(i in tweets.statuses) {
//             ret += tweets.statuses[i].text + "<br><br>";
//         }
//         res.send(tweets);
//     });
// });

app.get('/',function(req, res){
  // res.sendFile(path.join(__dirname+'/index.html'));
  res.send('asdf');
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('HackHarvard app listening at http://%s:%s', host, port);
});
