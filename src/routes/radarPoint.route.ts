import { Router } from 'express';
import { Request, Response } from 'express';
import { createRadarPointController, getRadarPointController } from './../controllers/'
import { PostRadarPointbodySchema } from './../validators';

const router: Router = Router();

router.post('/', PostRadarPointbodySchema, createRadarPointController);
router.get('/', getRadarPointController);

export const RadarPointRoutes: Router = router;
