import { Request, Response } from "express";
import { radarPoint } from "./../models";
import pointSchema from "./../@shared/models/pont.model";

const RADIUS_OF_EARTH = 6371;// km
const kmToRadian = (km: number) => km / RADIUS_OF_EARTH;

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

export const getRadarPoint = async (
  req: Request,
  res: Response
) => {
  try {
    // const points = await radarPoint.find({});
    const points = await radarPoint.find({
      "location": {
        $geoWithin: {
          $centerSphere: [ [47.1330708, 24.4590956], kmToRadian(100000) ]
        }
      }
    })
    res.send(points);
  } catch (err) {
    res.status(500).send(err);
  }
}

