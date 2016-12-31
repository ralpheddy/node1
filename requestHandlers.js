var querystring = require("querystring"),  // var exec = require("child_process").exec;
	  fs = require("fs"),
		formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" method="post">'+
	'<center>'+
	'<textarea name="text" rows="20" cols="60"></textarea><br/>'+
	'<input type="file" name="upload"><br/>'+
	'<input type="submit" value="Upload File" style="width:120px;font-weight:bold;" />'+
	'</center>'+
	'</form>'+
	'</body>'+
	'</html>';

	// exec("ls -lah", function (error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body); // response.write(stdout);
		response.end();
	// });
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
			console.log("parsing done");
			/* Possible error on Windows systems: tried to rename to an already existing file */
			fs.rename(files.upload.path, "/tmp/test.png", function(error) {
				if (error) {
					fs.unlink("/tmp/test.png");
					fs.rename(files.upload.path, "/tmp/test.png");
				}
			});
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
	// response.writeHead(200, {"Content-Type": "text/plain"});
	// response.write("You've sent: " + postData);
	// response.write("You've sent the text: " + querystring.parse(postData).text);
		  response.end();
		});
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
