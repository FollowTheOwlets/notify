import { ArgumentMetadata, BadRequestException, Injectable, ParseUUIDPipe, PipeTransform } from '@nestjs/common';
import { StringUtils } from '~src/utils/string.utils';
import headers from '~src/api/headers';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';
import { KafkaContext } from '@nestjs/microservices';

@Injectable()
export class KafkaParseMessagePipe implements PipeTransform {
  private parseUUIDPipe: ParseUUIDPipe;

  constructor() {
    this.parseUUIDPipe = new ParseUUIDPipe({ version: '4' });
  }

  async transform(message: KafkaContext, metadata: ArgumentMetadata) {
    const value = KafkaMessageDto.of(message.getMessage());
    await this.parseUUIDPipe.transform(value.headers[headers.X_REQUEST_ID], metadata);

    if (StringUtils.isBlank(value.message)) {
      throw new BadRequestException('text must be is not empty');
    }

    if (StringUtils.isBlank(value.level.toString())) {
      throw new BadRequestException('level must be is not empty');
    }
    return value;
  }
}
