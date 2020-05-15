const helpers = require("./helpers");

class Server {
  constructor(routes, opt) {
    opt = opt || {};
    const httpLib = opt.https ? "https" : "http";
    this.http = require(httpLib);
    this.routes = routes;
    this.opt = opt;
  }

  onRequest = (req, res) => {
    const route = this.routes.find((route) => {
      let isPath = false;
      let isMethod = false;

      if (route.path == "*" || helpers.stringRegExp(route.path).test(req.url)) {
        isPath = true;
      }

      if (
        route.method == "*" ||
        helpers.stringRegExp(route.method).test(req.method)
      ) {
        isMethod = true;
      }

      return isPath && isMethod;
    });

    if (route) {
      const options = {
        ...route,
        method: req.method,
        path: req.url,
        headers: {
          ...(route.headers || {}),
          ...req.headers,
        },
      };
      const proxy = this.http.request(options, function (r) {
        res.writeHead(r.statusCode, r.headers);
        r.pipe(res, {
          end: true,
        });
      });

      req.pipe(proxy, {
        end: true,
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify(new helpers.createError.NotFound()), "utf-8");
    }

    helpers.httpLogger(req, res);
  };

  start = (port = 3000) => {
    return this.opt.https
      ? this.http
          .createServer(
            { key: this.opt.key, cert: this.opt.cert },
            this.onRequest
          )
          .listen(process.env.PORT || port)
      : this.http.createServer(this.onRequest).listen(process.env.PORT || port);
  };
}

module.exports = Server;
