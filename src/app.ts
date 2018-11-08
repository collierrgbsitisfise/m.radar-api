import * as express from "express";
import * as bodyParser from "body-parser";
import { PingRoutes, RadarPointRoutes } from "./routes";
import mongoDbConnector from "./services/mongodb.connector.service";
import CronJobRunner from "./services/cronJobRunner.service";
import deleteOldPoints from "./cronJobs/deletePoints.job";
import deleteOldPatrolPoints from "./cronJobs/deleteOldPatrolPoints";

const app: express.Application = express();

const port: number = +process.env.PORT || 5525;

const db = new mongoDbConnector("radar");
db.connect()
  .then(res => {
    const cronJR = new CronJobRunner(120, deleteOldPoints);
    cronJR.startJob();

    const cronJobDeltePatrol = new CronJobRunner(30, deleteOldPatrolPoints);
    cronJobDeltePatrol.startJob();
  })
  .catch(err => console.log("Error db connection...", err));

app.use(bodyParser.json());

app.use("/ping", PingRoutes);
app.use("/radar-point", RadarPointRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

//PHP SID
// mvn1bvurhiu01r49f0javfsaa6;

//_ga
//GA1.2.1801841140.1541267577

//_gid
//GA1.2.134592514.1541617165

//i know magic
//vMjxqVwjxoy7xpbEVt6dfHeh%2BFEA%2BIZ%2F0WuwMPNa95yVlfM6AcXzug%3D%3D
