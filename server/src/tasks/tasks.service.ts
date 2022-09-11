import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly _logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  public handleTx() {
    this._logger.debug('Handle tx cron');
  }
}
