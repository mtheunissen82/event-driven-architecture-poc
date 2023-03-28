# Event driven architecture PoC

Word portions arrive in three different queues over time.
The server processes each portion and stores it in-memory.
When the whole word is complete, it is outputted in the terminal.

Use the client to send word portions to the three SQS queue's.

## Run

- `$ docker-compose up`
- `$ ./script/init-queues.sh`

- `$ npm run server`
- `$ npm run client portion <id> <begin portion> <middle portion> <end portion>`
