import { createServer } from './server'

const port = process.env.PORT || 4000

const server = createServer()

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})
