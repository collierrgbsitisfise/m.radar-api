import { Request, Response } from 'express';
import { radarPoint } from './../models';

export const createRadarPoint = function (req: Request, res: Response) {
    res.send('create');
}
