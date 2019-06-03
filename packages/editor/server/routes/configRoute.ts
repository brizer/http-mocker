import * as express from 'express'
import { ConfigService } from '../service/configService'
const router = express.Router()

router.get('/',ConfigService.getConfig)


export default router

