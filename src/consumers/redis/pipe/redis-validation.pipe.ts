import { PipeTransform, Injectable, ArgumentMetadata, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { RedisMessageDto } from '~src/consumers/redis/dto/redis-message.dto';
import { StringUtils } from '~src/utils/string.utils';

@Injectable()
export class RedisValidationPipe implements PipeTransform {
  private parseUUIDPipe: ParseUUIDPipe;
  constructor() {
    this.parseUUIDPipe = new ParseUUIDPipe({ version: '4' });
  }
  async transform(value: RedisMessageDto, metadata: ArgumentMetadata) {
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
