import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RedisMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  rqId: string;
}
