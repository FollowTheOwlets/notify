import 'reflect-metadata';
import { Controller } from '@nestjs/common';

export const K_CONTROLLER_METADATA_KEY = 'kafka:topic';

export function KController(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(K_CONTROLLER_METADATA_KEY, true, target);
    Controller()(target);
  };
}
