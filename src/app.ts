import * as express from 'express';
import { PingControllers } from './controllers';

const app: express.Application = express();

const port: number = +process.env.PORT || 3000;

app.use('/ping', PingControllers);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});