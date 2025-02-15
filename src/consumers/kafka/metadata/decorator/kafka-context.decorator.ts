import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { KMessage } from '~src/consumers/kafka/types';
import { KafkaContext } from '~src/consumers/kafka/context/kafka.context';

export const KCtx = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const kafkaContext = ctx.switchToRpc().getContext<KafkaContext>();
  console.log('🔥 ExecutionContext в KCtx:', kafkaContext);
  return KMessage.of(kafkaContext.getMessage());
});
