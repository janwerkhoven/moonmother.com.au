const FastBootAppServer = require('fastboot-app-server');

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  host: '0.0.0.0',
  port: 4000 // Optional - Sets the port the server listens on (defaults to the PORT env var or 3000).
});

server.start();
