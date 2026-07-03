// DirectAdmin / Passenger startup file for Next.js (self-hosting on Go54).
// Passenger's Node.js Selector needs a JS entry that listens on process.env.PORT.
// On the server: `npm ci && npm run build`, then set this file (server.js) as the
// app's "Application startup file" in Setup Node.js App. Vercel ignores this file.
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res, parse(req.url, true))).listen(port, () => {
    console.log(`Beetrus Portfolio ready on :${port}`);
  });
});
