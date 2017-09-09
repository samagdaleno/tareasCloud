var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var fs = require('fs');
var Bucket = 'cc414-images';
var Key = 'scientist.png';
var params = {
    Bucket,
    Key
};
var sessionParams = {totalObjectSize: 250}
var dir = './18416'

if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

s3.getObject(params, function () {
    var result = this.httpResponse.headers['x-amz-meta-move'];
    if (result) {
        download();
        fs.readFile('18416/scientist.png', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var image = new Buffer(data, 'binary');
                upload(image);
            }
        })
    } else {
        console.log("Undefined/False")
    }
});

function download() {
    s3.getObject(params,
        function (error, data) {
            if (error != null) {
                console.log("Failed to retrieve an object: " + error);
            } else {
                console.log("Loaded " + data.ContentLength + " bytes");
                fs.writeFile("18416/scientist.png", data.Body)
		console.log("The image was downloaded")
            }
        }
    );
};

function upload(image) {
    var params2 = {
        Bucket: "cc414-images/18416",
        Key,
        Body: image
    }
    s3.putObject(params2, function (error, data) {
	console.log("The image was uploaded")

    });
}
