# Event driven architecture PoC

## Server

The server receives word portions from three different queues that arrive over time.
It processes each portion and stores it in-memory.
When the whole word is complete, it is outputted in the terminal and removed from the (in-memory) store.
m

## Client

You can use the client to send word portions to the three SQS queue's.  
The client will ensure that the portions will be send in random order and with a random time in-between (0-10 seconds).
When sending word portions, an `id` is asked which is needed to associate and aggregate the data once it arrives in the server.

## Setup

- Start localstack: `$ docker-compose up`
- Initialize SQS queue's: `$ ./script/init-queues.sh`
- Copy .env file: `$ cp .env.example .env`
- Start the server: `$ npm run server`
- Call the client tool to provide word portions to the queue's: `$ npm run client portion <id> <begin portion> <middle portion> <end portion>`

### Example

You can call the client as follows: `npm run client portion 1 di no saur`.
As long as the `id` is unique you can call the client in parallel as much as you like.
More examples:

- npm run client portion 2 ba na na
- npm run client portion 3 dis cop arty
- npm run client portion 4 par al lel
- npm run client portion 5 isthis messa gestillintact?
- npm run client portion 6 you-can -also-make -a-scentence
