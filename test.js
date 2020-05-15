const Server = require("./server");
const routes = require("./routes");
const server = new Server(routes);
server.start();
