import EventEmitter from 'events';
import { Word, WordPortionPosition } from './word.js';

export class WordStorage extends EventEmitter {
  private readonly store: Map<number, Word> = new Map();

  saveWordPortion(id: number, position: WordPortionPosition, portion: string): void {
    if (!this.store.has(id)) {
      this.store.set(id, {});
    }

    const word = this.store.get(id)!;

    word[position] = portion;

    console.log(`STORAGE: saved id "${id}" position "${position}" portion "${portion}"`);

    const event: WordPortionSavedEvent = {
      id,
      position,
      portion,
      word
    };

    setImmediate(() => {
      this.emit('word_portion_saved', event);
    });
  }

  getWord(id: number): Word | undefined {
    return this.store.get(id);
  }

  removeWord(id: number) {
    this.store.delete(id);
  }
}

export type WordPortionSavedEvent = {
  id: number;
  position: WordPortionPosition;
  portion: string;
  word: Word;
}
