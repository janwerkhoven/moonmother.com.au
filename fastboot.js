const FastBootAppServer = require('fastboot-app-server');

const server = new FastBootAppServer({
  distPath: 'dist',
  host: '127.0.0.1',
  gzip: true
});

server.start();
