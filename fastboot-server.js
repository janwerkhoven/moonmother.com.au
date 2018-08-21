const FastBootAppServer = require('fastboot-app-server');

let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  host: '127.0.0.1'
});

server.start();
