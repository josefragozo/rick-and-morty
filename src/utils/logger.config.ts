import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, json } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const winstonConfig: winston.LoggerOptions = {
  level: 'info',
  format: combine(
    timestamp(),
    colorize(),
    json(),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      dirname: './logs',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
};