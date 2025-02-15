import 'reflect-metadata';

export const TOPIC_METADATA_KEY = 'kafka:topic';

export interface TopicListenerOptions {
  topics: string[];
  groupId: string;
}

export function TopicListener(options: TopicListenerOptions): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(TOPIC_METADATA_KEY, options, target.constructor, propertyKey);
  };
}
