import { Consumer } from 'sqs-consumer';
import { Message, SQSClient } from '@aws-sdk/client-sqs';
import { WordPortionPosition } from './word.js';
import { WordStorage } from './word-storage.js';

export const createWordPortionConsumer = (storage: WordStorage, position: WordPortionPosition): Consumer => {
  return new Consumer({
    sqs: new SQSClient({
      endpoint: process.env['QUEUE_ENDPOINT'],
    }),
    queueUrl: process.env[`QUEUE_WORD_PORTION_${position.toUpperCase()}_URL`]!,
    handleMessage: async (message: Message) => {
      const messageBody = JSON.parse(message.Body!) as {id: number, portion: string};

      storage.saveWordPortion(messageBody.id, position, messageBody.portion);
    },
  });
}
