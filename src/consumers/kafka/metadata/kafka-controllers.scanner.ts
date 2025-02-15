import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { K_CONTROLLER_METADATA_KEY } from '~src/consumers/kafka/metadata/decorator/k-controller.decorator';
import {
  TOPIC_METADATA_KEY,
  TopicListenerOptions,
} from '~src/consumers/kafka/metadata/decorator/topic-listener.decorator';
import { ModulesContainer } from '@nestjs/core';
import { KafkaConsumersInitializer } from '~src/consumers/kafka/metadata/kafka-consumers.initializer';

@Injectable()
export class KafkaControllersScanner implements OnApplicationBootstrap {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly kafkaConsumersInitializer: KafkaConsumersInitializer,
  ) {}

  onApplicationBootstrap() {
    for (const moduleRef of this.modulesContainer.values()) {
      for (const controller of moduleRef.controllers.values()) {
        if (!Reflect.getMetadata(K_CONTROLLER_METADATA_KEY, controller.instance.constructor)) {
          continue;
        }

        const prototype = Object.getPrototypeOf(controller.instance);

        for (const methodName of Object.getOwnPropertyNames(prototype)) {
          const method = prototype[methodName];
          if (typeof method !== 'function') continue;
          const options: TopicListenerOptions = Reflect.getMetadata(
            TOPIC_METADATA_KEY,
            prototype.constructor,
            methodName,
          );
          if (options) {
            this.kafkaConsumersInitializer.initialize(options, methodName, controller);
          }
        }
      }
    }
  }
}
