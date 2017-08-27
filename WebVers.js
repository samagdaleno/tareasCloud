var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var params = {
	Bucket:'samweb', 
	Key: 'index.html'}

s3.getObject(params, function(err, data) {
	if (err) console.log(err, err.stack); // an error occurred
	else console.log('La última versón de '+ params.Key + ' es de: ' + data.LastModified);  //successful respons
});
