var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		// var count = 0;

		/*
		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			count++;
			console.log(count +" - Received POST data chunk '"+
			postDataChunk + "'.");
		});
		*/

		// request.addListener("end", function() {
			route(handle, pathname, response, request);
		// });


		// response.writeHead(200, {"Content-Type": "text/plain"});
		// var content = route(handle, pathname);
  	// response.write(content); // "Hello World...");
  	// response.end();
	}

	// var port_number = server.listen(process.env.PORT || 8888);

	http.createServer(onRequest).listen(process.env.PORT || 8888); // http.createServer(onRequest).listen(8888);

	console.log("Server has started.");
}
exports.start = start;
