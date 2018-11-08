import { radarPoint } from "./../models";

const HalfHoursSeconds = 1800;

export default async function deleteOldPatrolPoints() {
  const points = await radarPoint.find({
    typePoint: "patrol"
  });
  points.forEach(async (point: any) => {
    const inSeconds = +new Date(point.time);
    const currentTime = +new Date();

    if (currentTime - inSeconds > HalfHoursSeconds) {
      radarPoint
        .find({ _id: point._id })
        .remove()
        .exec();
    }
  });
}
