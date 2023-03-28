export enum WordPortionPosition {
  begin = 'begin',
  middle = 'middle',
  end = 'end',
}

export type Word = {
  [WordPortionPosition.begin]?: string;
  [WordPortionPosition.middle]?: string;
  [WordPortionPosition.end]?: string;
}

export const isWordComplete = (word: Word) => {
  return Object.entries(word).length === 3 && Object.entries(word).every(entry => !!entry[1]);
}
