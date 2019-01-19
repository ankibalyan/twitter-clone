const env = process.env.NODE_ENV || 'development'

function errHandler(err, req, res, next) {
  console.log("###########ERROR##########");

  let { status, message } = err
  status = status || 500

  const response = {
    error: message,
    status: 'Failure',
    msg: {
      title: 'Error',
      body: message
    },
    statusCode: status
  }

  console.error(response);

  console.error(req.url, response.error, status)
  if (env === 'production') {
    if (status === 500) {
      console.error(err.stack.split('\n')) // we only want stack trace if its a 500 error, or we are in dev mode
      response.error = response.msg.body = 'An unexpected error has occured'
    }
  } else {
    response.stack = err.stack.split('\n')
    console.error(response.stack)
  }

  res.status(status).json(response)
}

module.exports = errHandler
