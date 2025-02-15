import { ArgumentMetadata, BadRequestException, Injectable, ParseUUIDPipe, PipeTransform } from '@nestjs/common';
import { StringUtils } from '~src/utils/string.utils';
import { KMessage } from '~src/consumers/kafka/types';
import headers from '~src/api/headers';

@Injectable()
export class KafkaValidationPipe implements PipeTransform {
  private parseUUIDPipe: ParseUUIDPipe;

  constructor() {
    this.parseUUIDPipe = new ParseUUIDPipe({ version: '4' });
  }

  async transform(value: KMessage, metadata: ArgumentMetadata) {
    const rqId = await this.parseUUIDPipe.transform(value.headers[headers.X_REQUEST_ID], metadata);
    if (StringUtils.isBlank(value.message)) {
      throw new BadRequestException('text must be is not empty');
    }
    return {
      rqId,
      message: value.message,
    };
  }
}
