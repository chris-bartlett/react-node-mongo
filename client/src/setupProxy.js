const { createProxyMiddleware } = require("http-proxy-middleware");
// this file is used to proxy requests from the client to the server
// without needing to worry about CORS errors
// this is only needed in development
// in prod it will be built  so no need for server. 
// The browser will prepend the URL full url
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:4000",
    })
  );
};