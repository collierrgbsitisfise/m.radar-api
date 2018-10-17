import { Router, Request, Response } from 'express';
import { createRadarPointController } from './../controllers/'

const router: Router = Router();

router.get('/', createRadarPointController);

export const RadarPointRoutes: Router = router;