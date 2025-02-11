import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message, TMessageEntity } from '~src/messages/entity/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';

@Injectable()
export class MessagesRepository {
  private log: LoggerService;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  async save(message: Message): Promise<TMessageEntity> {
    try {
      const created = new this.messageModel(message);
      return await created.save();
    } catch (error) {
      await this.log.E(`Error when trying to save a message: ${message} \n ${error}`);
    }
  }

  async find(_id: number): Promise<TMessageEntity> {
    try {
      return await this.messageModel.findOne<TMessageEntity>({ _id }).exec();
    } catch (error) {
      await this.log.E(`Error when trying to find a message: ${_id} \n ${error}`);
    }
  }

  async delete(_id: number): Promise<TMessageEntity> {
    try {
      return await this.messageModel.findOneAndDelete<TMessageEntity>({ _id }).exec();
    } catch (error) {
      await this.log.E(`Error when trying to delete a message: ${_id} \n ${error}`);
    }
  }
}
