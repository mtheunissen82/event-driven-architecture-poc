import { WordStorage } from './word-storage.js'
import { Worker } from './worker.js';
import { WordPortionPosition } from './word.js';
import { createWordPortionConsumer } from './consumer.js';

const storage = new WordStorage();
const worker = new Worker(storage);

const consumerWordPortionBegin = createWordPortionConsumer(storage, WordPortionPosition.begin);
const consumerWordPortionMiddle = createWordPortionConsumer(storage, WordPortionPosition.middle);
const consumerWordPortionEnd = createWordPortionConsumer(storage, WordPortionPosition.end);

worker.start();

consumerWordPortionBegin.start();
consumerWordPortionMiddle.start();
consumerWordPortionEnd.start();
