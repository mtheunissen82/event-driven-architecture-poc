import { isWordComplete } from './word.js';
import { WordPortionSavedEvent, WordStorage } from './word-storage.js';

export class Worker {
  constructor(private readonly store: WordStorage) {
    this.handleWordPortionSaved = this.handleWordPortionSaved.bind(this);
  }

  start() {
    this.store.on('word_portion_saved', this.handleWordPortionSaved)
  }

  private handleWordPortionSaved(event: WordPortionSavedEvent) {
    console.log(`WORKER: event came in: ${JSON.stringify(event)}`);

    if (isWordComplete(event.word)) {
      console.log(`WORKER: event with id ${event.id} is complete`);
      console.log(`WORKER: the word is "${event.word.begin}${event.word.middle}${event.word.end}"`)

      this.store.removeWord(event.id);
    } else {
      console.log(`WORKER: event with id ${event.id} is NOT complete`);
    }
  }
}
