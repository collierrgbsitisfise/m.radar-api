import * as cron from "node-cron";

class CronJobRunner {
  private repeatOncePerMinute: number;
  private job: Function;

  constructor(repeatOncePerMinute: number, job: Function) {
    this.repeatOncePerMinute = repeatOncePerMinute;
    this.job = job;
  }

  public startJob() {
    cron.schedule(`*/${this.repeatOncePerMinute} * * * *`, () => {
      this.job();
    });
  }
}

export default CronJobRunner;
