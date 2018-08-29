module.exports = {
  test: {
    host: '127.0.0.1',
    port: '6379',
    db: 1
  },
  development: {
    host: '127.0.0.1',
    port: '6379',
    db: 1,
    socket_keepalive: true
  },
  qa: {
    host: '127.0.0.1',
    port: '6379',
    db: 1
  },
  production: {
    host: '127.0.0.1',
    port: '6379',
    db: 1
  }
}
