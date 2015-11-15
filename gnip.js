var request = require('request');
var express = require('express');
var app = express();
var path = require("path");

var query = "a";

var post = '{\"publisher\":\"twitter\",\"query\":\"'+query+' -is:retweet has:geo lang:en\",\"maxResults\":\"500\",\"lang\":\"en\"}';
var next = "";
var ret = "var addressPoints = [<br>"
var run = function(iteration) {
    request.post('https://search.gnip.com/accounts/twitter-fabric/search/prod.json',function(err, tweets, response) {
        var json = JSON.parse(tweets.body).results;
        var count = 0;
        next = JSON.parse(tweets.body).next;
        for(i in json) {
            if(json[i].location) {
                var coordinates = json[i].location.geo.coordinates[0];
                var x = 0;
                var y = 0;
                for(j in coordinates) {
                    x+=coordinates[j][1];
                    y+=coordinates[j][0];
                }

                x = Math.round(x*1000000)/1000000;
                y = Math.round(y*1000000)/1000000;

                ret+="["+(x/4)+", "+(y/4)+", \"1\"],<br>";
                count++;
            }
        }
        console.log(iteration + ' done ' + count);
        if(err) {
            console.error("error", err);
        }
        if(iteration < 120) {
            post = '{\"publisher\":\"twitter\",\"query\":\"'+query+' -is:retweet has:geo lang:en\",\"maxResults\":\"500\",\"lang\":\"en\",\"next\":\"'+next+'\"}';
            run(iteration+1);
        }
        if(iteration == 120) {
            console.log("finished");
        }
    }).auth('alexs@twitter.com', 'hackharvard', true).form(post);
}
run(1);

app.get('/',function(req,res){
    res.send(ret);
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('HackHarvard app listening at http://%s:%s', host, port);
});
