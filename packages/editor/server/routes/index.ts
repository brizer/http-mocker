import * as express from 'express'
import configRoute from './configRoute'

const router = express.Router()

router.use('/config',configRoute)

export default router