import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  levelsArr: string[] = ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'];
  consoleLogger = new ConsoleLogger();

  log(message) {
    this.consoleLogger.log(message);
  }

  fatal(message) {
    this.consoleLogger.fatal(message);
  }

  error(message) {
    this.consoleLogger.error(message);
  }

  warn(message) {
    this.consoleLogger.warn(message);
  }

  debug?(message) {
    this.consoleLogger.debug(message);
  }

  verbose?(message) {
    this.consoleLogger.verbose(message);
  }
}
