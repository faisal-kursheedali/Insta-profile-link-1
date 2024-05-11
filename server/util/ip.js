const requestIP = require("request-ip");

const getIp = (req) => {
  const ip = requestIP.getClientIp(req);

  return ip;
};
module.exports = getIp;
