export default (ctx, inject) => {
  if (process.client) {
    if (!ctx.app.$config) {
      throw new Error('No app config')
    }
    if (!ctx.app.$config.BACKEND_URI) {
      throw new Error('No BACKEND_URI in app config')
    }

    ctx.$axios.defaults.baseURL = ctx.app.$config.BACKEND_URI
  }
}
