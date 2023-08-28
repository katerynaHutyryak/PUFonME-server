/* eslint-disable no-console */
import http from 'http'
import app from './app'
import autoDeleteFiles from './helpers/autoDeleteFiles'

setInterval(autoDeleteFiles, 24 * 60 * 60 * 1000)

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise)
    console.error('Reason:', reason)
})

const server = http.createServer(app)

const PORT = 8080
server.listen(PORT, () => console.log(`app is running on port ${PORT}`))
