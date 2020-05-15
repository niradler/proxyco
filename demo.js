const http = require("http");

http
  .createServer(function (request, response) {
    console.log("request ", request.url);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({ url: request.url, headers: request.headers }),
      "utf-8"
    );
  })
  .listen(8125);
console.log("Server running at http://127.0.0.1:8125/");
