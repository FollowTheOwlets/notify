import headers from '~src/api/headers';

export class KafkaMessageDto {
  headers: Record<(typeof headers)[keyof typeof headers], string>;
  message: string;
}
