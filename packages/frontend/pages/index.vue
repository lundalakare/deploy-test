<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        deploy-test-frontend
      </h1>
      <h2 class="subtitle">
        Response from backend:
      </h2>
      <div class="result">
        <div
          v-if="result"
          class="message is-link"
        >
          <pre class="code">{{ JSON.stringify(result, null, 2) }}</pre>
        </div>
        <div
          v-if="error"
          class="message is-danger"
        >
          <pre class="code">{{ error }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data: () => ({
    result: null,
    error: null
  }),
  async mounted () {
    try {
      const response = await this.$axios.get('/')
      this.result = response.data
    } catch (err) {
      this.error = err
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.result {
  padding-top: 15px;
  text-align: left;
}
.code {
  background-color: transparent;
}
</style>
