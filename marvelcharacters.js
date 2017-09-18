var timestamp = "1";
var publickey = "ce5a7162468682fcc8b0cb88d351a8bf";
var privatekey = "8e0e98d392a4ffa7ffe8e2383d2add69825b9add";
var hashing = "1" + privatekey + publickey;
var limit = 100;
var http = require('https');
var crypto = require('crypto');
var hash = crypto.createHash('md5').update(hashing).digest("hex");
var async = require("async");
var AWS = require('aws-sdk');
var lambda = new AWS.Lambda('"region":"us-east-1"')

module.exports.get = (event, context, callback) => {
    var fullNames = [];
    var tasks = [];
    for (let index = 0; index < 15; index++) {
        tasks.push(function (callback) {
            var offset = (index * 100);
            url = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=" + publickey + "&hash=" + hash + "&limit=" + limit + "&offset=" + offset;
            http.get(url, (res) => {
                res.setEncoding('utf8');
                var totalData = "";
                res.on("data", (data) => {
                    totalData += data;
                });
                res.on("end", (data) => {
                    var info = JSON.parse(totalData);
                    var results = info.data.results;
                    var heroesNames = [];
                    for (j = 0; j < limit; j++) {
                        try {
                            var name = results[j].name;
                            fullNames.push(name);
                        } catch (err) {
                            j = limit;
                        }

                    }
                    callback(null, fullNames);
                })
            })
        });
    }
    async.parallel(tasks, function (error, data) {
        if (error) {
            callback(error);
        } else {
            callback(null, fullNames);
        }
    });
}


//This code was written with the help of emilio who had to look at documentation for 6 hours to know what callbacks did and the explain it to me, I helped him with the api calls from browser so quid pro quo. 
