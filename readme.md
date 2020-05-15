# Proxyco

a simple proxy solution in native node, this is just a draft.

## Setup

```sh
npm i proxyco
```

### Usage

```js
//proxy.js
const Server = require("proxyco/server");
const routes = require("./routes");
const options = {};
const server = new Server(routes, options);
server.start(port);
```

```json
//roues.js
module.exports = [
  {
    hostname: "localhost",
    port: 8125,
    path: `/\/api\//`,
    method: "*",
    headers: {
      service: 1,
    },
  },
];
```
