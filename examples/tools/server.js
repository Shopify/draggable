import browsersync from 'browser-sync';

export const server = browsersync.create();

// reload function requires a callback in order to reload properly
export function reloadServer(done) {
  server.reload();
  done();
}

export function startServer() {
  const serverConfig = {
    open: false,
    server: './dist',
    ghostMode: false,
  };

  server.init(serverConfig);
}
