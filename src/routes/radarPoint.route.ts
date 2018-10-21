import { Router } from 'express';
import { createRadarPointController, getRadarPointController, getRadarPointByradiusController } from './../controllers/'
import { PostRadarPointbodySchema, GetRadarPointsByRadiusQuerySchema } from './../validators';

const router: Router = Router();

router.post('/', PostRadarPointbodySchema, createRadarPointController);
router.get('/', GetRadarPointsByRadiusQuerySchema, getRadarPointByradiusController);
router.get('/all', getRadarPointController);

export const RadarPointRoutes: Router = router;
