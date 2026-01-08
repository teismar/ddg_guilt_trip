import { DEBUG } from './config';

export const logger = {
  log: (...args: any[]) => {
    if (DEBUG) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (DEBUG) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (DEBUG) console.error(...args);
  }
};
