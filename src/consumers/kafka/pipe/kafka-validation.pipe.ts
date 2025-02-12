import { ArgumentMetadata, BadRequestException, Injectable, ParseUUIDPipe, PipeTransform } from '@nestjs/common';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';
import { StringUtils } from '~src/utils/string.utils';

@Injectable()
export class KafkaValidationPipe implements PipeTransform {
  private parseUUIDPipe: ParseUUIDPipe;

  constructor() {
    this.parseUUIDPipe = new ParseUUIDPipe({ version: '4' });
  }

  async transform(value: KafkaMessageDto, metadata: ArgumentMetadata) {
    const rqId = await this.parseUUIDPipe.transform(value.rqId, metadata);
    if (StringUtils.isBlank(value.text)) {
      throw new BadRequestException('text must be is not empty');
    }
    return {
      rqId,
      text: value.text,
    };
  }
}
