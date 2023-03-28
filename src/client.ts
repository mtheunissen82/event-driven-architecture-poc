import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Command } from 'commander';
const program = new Command();

type MessageBody = {
  id: number;
  portion: string;
}

const sqs = new SQSClient({
  endpoint: process.env['QUEUE_ENDPOINT'],
});

program
  .name('word-portion-client')
  .description('CLI to split word in portions and send to SQS')
  .version('0.0.1');

program.command('portion')
  .description('Split a word into three portions and send to SQS')
  .argument('<id>', 'the id for grouping')
  .argument('<begin>', 'begin portion')
  .argument('<middle>', 'middle portion')
  .argument('<end>', 'end portion')
  .action((id, begin, middle, end) => {
    const portionEntries = Object.entries({begin, middle, end});
    portionEntries.sort(() => Math.random() - 0.5);

    portionEntries.forEach((entry) => {
      setTimeout(() => {
        const messageBody: MessageBody = {id, portion: entry[1]};
        const messageCommand = new SendMessageCommand(
          {QueueUrl: process.env[`QUEUE_WORD_PORTION_${entry[0].toUpperCase()}_URL`], MessageBody: JSON.stringify(messageBody) });

        sqs.send(messageCommand);
        console.log(`CLIENT: send ${JSON.stringify(messageBody)}`)
      }, Math.random() * 10000);
    });
  });

program.parse();
