import { BadRequestException, CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { ConsumerFactory } from '~src/consumers/kafka/factory/consumer.factory';
import { TopicListenerOptions } from '~src/consumers/kafka/metadata/decorator/topic-listener.decorator';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { KafkaContext } from '~src/consumers/kafka/context/kafka.context';
import { EachMessagePayload } from 'kafkajs';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { GUARDS_METADATA, INTERCEPTORS_METADATA } from '@nestjs/common/constants';

@Injectable()
export class KafkaConsumersInitializer {
  constructor(
    private readonly consumerFactory: ConsumerFactory,
    private readonly moduleRef: ModuleRef,
    private readonly reflector: Reflector,
  ) {}

  initialize(options: TopicListenerOptions, methodName: string, controller: InstanceWrapper<object>) {
    this.consumerFactory.getConsumer({
      topics: { topics: options.topics, fromBeginning: true },
      config: { groupId: options.groupId },
      onMessage: async (message) =>
        await this.executeWithGuardsAndInterceptors(controller.instance, methodName, message),
    });
  }

  private async executeWithGuardsAndInterceptors(instance: any, methodName: string, message: EachMessagePayload) {
    const context: ExecutionContext = {
      switchToRpc: () => ({
        getContext: () => new KafkaContext(message),
        getData: () => message,
      }),
      getClass: () => instance.constructor,
      getHandler: () => instance[methodName],
    } as ExecutionContext;

    const guardClasses =
      this.reflector.getAllAndOverride(GUARDS_METADATA, [instance.constructor, instance[methodName]]) || [];

    const guards = guardClasses.map((GuardClass) => this.moduleRef.get(GuardClass, { strict: false }));

    for (const guard of guards) {
      if (!(await guard.canActivate(context))) {
        throw new BadRequestException();
      }
    }

    const interceptors =
      this.reflector.getAllAndOverride(INTERCEPTORS_METADATA, [instance.constructor, instance[methodName]]) || [];

    let callHandler: CallHandler = {
      handle() {
        return of(instance[methodName].call(instance, message));
      },
    };

    for (const interceptor of interceptors.reverse()) {
      callHandler = {
        handle: () => interceptor.intercept(context, callHandler) as Observable<any>,
      };
    }

    callHandler.handle();
  }
}
