# Event driven architecture PoC

Word portions arrive in three different queues over time.
The server processes each portion and stores it in-memory.
When the whole word is complete, it is outputted in the terminal.

Use the client to send word portions to the three SQS queue's.  
The client will ensure that the portions will be send in random order and with a random time in-between (0-10 seconds).

## Run

- Start localstack: `$ docker-compose up`
- Initialize SQS queue's: `$ ./script/init-queues.sh`
- Copy .env file: `$ cp .env.example .env`
- Start the server: `$ npm run server`
- Call the client tool to provide word portions to the queue's: `$ npm run client portion <id> <begin portion> <middle portion> <end portion>`
