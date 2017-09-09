var http = require('https');
var apiKey = "L9JyFoaQrUvDKSdGmMrMmyqicsOBNhVx5IaAGRED";
var fs = require('fs');
var request = require('request');
var globalUrl = "";
var url = 'https://api.nasa.gov/planetary/apod?api_key='+apiKey;
var file = fs.createWriteStream("PhotoOfTheDay.jpg");

http.get(url, (res) => {
    res.setEncoding('utf8');
    res.on("data", (data) => {
        var info = JSON.parse(data);
        globalUrl = info.hdurl;
        var title = info.title;
        var explanation = info.explanation;
        var copyright = info.copyright;
        var date = info.date;
        console.log("Title: "+title+
                    "\nExplanation: "+explanation+
                    "\nCopyright: "+copyright+
                    "\nDate: "+date);
        var request = http.get(globalUrl, function(response) {
            response.pipe(file);
            console.log("Image downloaded.");
        });
    });
});
