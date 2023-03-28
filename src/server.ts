import { Consumer } from 'sqs-consumer';

import { WordStorage } from './word-storage.js'
import { Worker } from './worker.js';
import { WordPortionPosition } from './word.js';
import { createWordPortionConsumer } from './consumer.js';

const storage = new WordStorage();
const worker = new Worker(storage);

const queueWpBegin = createWordPortionConsumer(storage, WordPortionPosition.begin);
const queueWpMiddle = createWordPortionConsumer(storage, WordPortionPosition.middle);
const queueWpEnd = createWordPortionConsumer(storage, WordPortionPosition.end);

worker.start();

queueWpBegin.start();
queueWpMiddle.start();
queueWpEnd.start();
