import * as express from 'express'
import { RouteService } from '../service/routeService'
const router = express.Router()

router.get('/',RouteService.getRoute)
router.post('/',RouteService.setRoute)


export default router

