import { Router } from 'express';
import { createRadarPointController } from './../controllers/'
import { PostRadarPointbodySchema } from './../validators';

const router: Router = Router();

router.post('/', PostRadarPointbodySchema, createRadarPointController);

export const RadarPointRoutes: Router = router;