# Redirect traffic from http to https

1. `yarn add --exact express`.
2. Create `server.js`.
```js
const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;

function sslRedirect() {
  return (req, res, callback) => {
    if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
      res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
      return;
    }

    callback();
  };
}

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(sslRedirect());

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }

    process.stdout.write(`Ready on port ${port}\n`);
  });
});
```
3. Change `yarn start` script to `NODE_ENV=production node server.js`
