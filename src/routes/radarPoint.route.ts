import { Router, Request, Response } from 'express';
import * as expressJoi from 'express-joi-validation';
import * as Joi from 'joi';
import { createRadarPointController } from './../controllers/'

const validator= expressJoi({});

const router: Router = Router();

const bodySchema = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    informator: Joi.string().default('anonymous')
});

router.post('/', validator.body(bodySchema), createRadarPointController);

export const RadarPointRoutes: Router = router;