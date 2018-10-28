import * as express from "express";
import * as bodyParser from "body-parser";
import { PingRoutes, RadarPointRoutes } from "./routes";
import mongoDbConnector from "./services/mongodb.connector.service";

const app: express.Application = express();

const port: number = +process.env.PORT || 5525;

const db = new mongoDbConnector("radar");
db.connect()
  .then(res => console.log(res))
  .catch(err => console.log("Error db connection...", err));

app.use(bodyParser.json());

app.use("/ping", PingRoutes);
app.use("/radar-point", RadarPointRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
