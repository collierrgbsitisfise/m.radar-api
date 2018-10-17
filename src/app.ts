import * as express from 'express';
import { PingRoutes } from './routes';
import mongoDbConnector from './services/mongodb.connector.service';

const app: express.Application = express();

const port: number = +process.env.PORT || 3000;

const db = new mongoDbConnector('radar');
db.connect()
  .then(res => console.log(res))
  .catch(err => console.log('Error db connection...',err));

app.use('/ping', PingRoutes);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});