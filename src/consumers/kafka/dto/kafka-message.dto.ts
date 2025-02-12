import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class KafkaMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  rqId: string;
}
