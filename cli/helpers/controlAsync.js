const controlAsync = promise =>
  promise.then(success => ({ success })).catch(error => ({ error }))

module.exports = controlAsync
