import { google } from './google';
import { youtube } from './youtube';
import { amazon } from './amazon';
import { github } from './github';
import { BangConfig } from '../models/bang';
import { wikipedia } from './wikipedia';
import { reddit } from './reddit';

export const SUPPORTED_BANGS: BangConfig[] = [
  google,
  youtube,
  amazon,
  github,
  wikipedia,
  reddit
];

export * from '../models/bang';
