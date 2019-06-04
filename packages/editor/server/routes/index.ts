import * as express from 'express'
import configRoute from './configRoute'
import routeRoute from './routeRoute'

const router = express.Router()

router.use('/config',configRoute)
router.use('/route',routeRoute)

export default router