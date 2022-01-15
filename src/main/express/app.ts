import express from 'express'
import { setupDeliveriesRoute } from './routes/deliveries-route-setup'

const app = express()
setupDeliveriesRoute(app)

export default app
