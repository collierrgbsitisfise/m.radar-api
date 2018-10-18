import * as expressJoi from 'express-joi-validation';
import * as Joi from 'joi';

const validator= expressJoi({});

export const PostRadarPointbodySchema = validator.body(Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    informator: Joi.string().default('anonymous')
}));