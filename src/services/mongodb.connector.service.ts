import * as mongoose from 'mongoose';

class mongoDbConnector {
    private dataBase: string;
    private userName: string;
    private password: string;
    private host: string;
    private protocol:string = 'mongodb'
    
    constructor(dataBase: string, userName?: string, password?: string, host?: string) {
        this.dataBase = dataBase;
        this.userName = userName;
        this.password = password;
        this.host = host;
    }
    
    private formatConnectionUrl(): string {

        if (this.userName && this.password) {
            return `${this.protocol}://${this.userName}:${this.password}@${this.host}:47330/${this.dataBase}`;
        }

        return `mongodb://localhost:27017/${this.dataBase}`;
    }
    
    public async connect(): Promise<any> {
        const dbUrl = this.formatConnectionUrl();

        const connectPromise = function (resolve: any, reject: any): any {
            mongoose.set('useCreateIndex', true)
            mongoose.connect(
                dbUrl,
                { useNewUrlParser: true },
                (err: any) => {
                    if (err) {
                      reject(err);
                    }

                    resolve('connected');
                  }
            );
        };

        return new Promise(connectPromise);
    }
}

export default mongoDbConnector;
