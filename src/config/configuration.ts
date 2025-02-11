import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import * as ejs from 'ejs';
import { join } from 'path';
import('dotenv/config');

const YAML_CONFIG_FILENAME = '../../application.properties.yaml';

export default () => {
  const configTemplate = readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8');
  const configString = ejs.render(configTemplate);

  const config = yaml.load(configString) as Record<string, any>;
  if (config.http.port < 1024 || config.http.port > 49151) {
    throw new Error('HTTP port must be between 1024 and 49151');
  }

  return config;
};
