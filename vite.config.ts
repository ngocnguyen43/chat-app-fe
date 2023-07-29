let config
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  config = require('./vite.dev.config').default
} else {
  config = require('./vite.prod.config').default
}

export default config
