import * as express from 'express'
import { RouteService } from '../service/routeService'
const router = express.Router()

router.get('/',RouteService.getRoute)
router.post('/',RouteService.getRoute)


export default router

