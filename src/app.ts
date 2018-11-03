import * as express from "express";
import * as bodyParser from "body-parser";
import { PingRoutes, RadarPointRoutes } from "./routes";
import mongoDbConnector from "./services/mongodb.connector.service";
import CronJobRunner from "./services/cronJobRunner";

const app: express.Application = express();

const port: number = +process.env.PORT || 5525;

const db = new mongoDbConnector("radar");
db.connect()
  .then(res => {
    const cronJR = new CronJobRunner(1, () => console.log("lala"));
    cronJR.startJob();
  })
  .catch(err => console.log("Error db connection...", err));

app.use(bodyParser.json());

app.use("/ping", PingRoutes);
app.use("/radar-point", RadarPointRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
