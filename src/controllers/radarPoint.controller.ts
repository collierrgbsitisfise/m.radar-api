import { Request, Response } from "express";
import { radarPoint } from "./../models";
import pointSchema from "./../@shared/models/pont.model";

export const createRadarPoint = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      informator,
      latitude,
      longitude
    } = req.body;
  
    const location = {
      type: "Point",
      coordinates: [latitude, longitude]
    };

    const newRadarPoint = new radarPoint({
      informator,
      location
    });

    const result = await newRadarPoint.save();

    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

