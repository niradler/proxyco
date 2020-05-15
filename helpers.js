const createError = require("http-errors");
const morgan = require("morgan");
const logger = morgan("combined");
const finalhandler = require("finalhandler");

const stringRegExp = (input) => {
  const regParts = input.match(/^\/(.*?)\/([gim]*)$/);
  let regexp = null;
  if (regParts) {
    regexp = new RegExp(regParts[1], regParts[2]);
  } else {
    regexp = new RegExp(input);
  }

  return regexp;
};

const httpLogger = (req, res) => {
  var done = finalhandler(req, res);

  logger(req, res, function (err) {
    if (err) return done(err);
  });
};

module.exports = {
  stringRegExp,
  createError,
  httpLogger,
};
