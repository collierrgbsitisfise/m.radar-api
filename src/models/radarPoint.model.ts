import * as mongoose from "mongoose";
import pointSchema from "./../@shared/models/pont.model";

const SchemaM = mongoose.Schema;

const radarPointSchema = new SchemaM({
  informator: {
    type: String,
    default: "anonymous"
  },
  time: {
    type: String,
    default: new Date()
  },
  location: {
    type: pointSchema,
    required: true
  }
});

radarPointSchema.pre("save", function preSave(this: any, next) {
  this.time = new Date();
  next(null);
});

const radarPoint = mongoose.model("radarPoint", radarPointSchema);

export default radarPoint;
