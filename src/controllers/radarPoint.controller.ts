import * as url from "url";
import { Request, Response } from "express";
import { radarPoint } from "./../models";
import gMapService from "./../services/gMap.service";

const RADIUS_OF_EARTH_IN_KM = 6371; // km
const kmToRadian = (km: number) => km / RADIUS_OF_EARTH_IN_KM;

export const createRadarPoint = async (req: Request, res: Response) => {
  try {
    const { informator, latitude, longitude, typePoint } = req.body;

    const location = {
      type: "Point",
      coordinates: [latitude, longitude]
    };

    const newRadarPoint = new radarPoint({
      informator,
      location,
      typePoint
    });

    const result = await newRadarPoint.save();

    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getRadarPoint = async (req: Request, res: Response) => {
  try {
    const points = await radarPoint.find({});
    res.send(points);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getRadarPointByradius = async (req: Request, res: Response) => {
  try {
    const radius: number = +req.query.radius;
    const latitude: number = +req.query.latitude;
    const longitude: number = +req.query.longitude;
    const points = await radarPoint.find({
      location: {
        $geoWithin: {
          $centerSphere: [[latitude, longitude], kmToRadian(radius)]
        }
      }
    });
    res.send(points);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getgMapLink = async (req: Request, res: Response) => {
  try {
    const radius: number = +req.query.radius;
    const latitude: number = +req.query.latitude;
    const longitude: number = +req.query.longitude;
    const points = await radarPoint.find({
      location: {
        $geoWithin: {
          $centerSphere: [[latitude, longitude], kmToRadian(radius)]
        }
      }
    });

    const gApiKey = "AIzaSyAoNsfuomFR9sqJThzQvZuTAZQp61Gaa9o";

    let gMap = new gMapService(
      gApiKey,
      {
        latitude,
        longitude
      },
      "roadmap"
    );

    const markers = points.map((item: any) => ({
      latitude: item.location.coordinates[0],
      longitude: item.location.coordinates[1]
    }));

    gMap.setMarker(markers);

    const result = gMap.generateMapLink(radius);

    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
