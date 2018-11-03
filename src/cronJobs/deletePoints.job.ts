import { radarPoint } from "./../models";

const TwoHoursSeconds = 7200;

export default async function deleteOldPoints() {
  const points = await radarPoint.find({});
  points.forEach(async (point: any) => {
    const inSeconds = +new Date(point.time);
    const currentTime = +new Date();

    if (currentTime - inSeconds > TwoHoursSeconds) {
      radarPoint
        .find({ _id: point._id })
        .remove()
        .exec();
    }
  });
}
