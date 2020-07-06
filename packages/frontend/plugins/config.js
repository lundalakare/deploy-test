export default async ({ store, $axios, ...ctx }, inject) => {
  // This is to stop errors in SSR. Ideally we would send the configuration
  // though environment variables like in development instead.
  if (!process.client) {
    return
  }

  // This is the environment variables inherited from the shell at build time.
  // Note that any environment variables must be defined in nuxt.config.js.
  let env = ctx.env

  // Fetch config from the backend and apply to env if in production.
  if (process.env.NODE_ENV === 'production') {
    try {
      const result = await $axios.get('/config.json', {
        baseURL: '/'
      })

      if (result && result.data) {
        env = {
          ...env,
          ...result.data
        }
      } else {
        throw new Error('Malformed config.json')
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed fetching config:', e)
      throw e
    }
  }

  /**
   * If you're configuring Axios base URL from environment for production builds
   * you want to uncomment the following lines
   */
  // if (env.API_ENDPOINT) {
  //   $axios.defaults.baseURL = env.API_ENDPOINT
  // }

  inject('config', env)
}
