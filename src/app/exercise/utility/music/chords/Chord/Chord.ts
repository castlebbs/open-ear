import { NoteType } from '../../notes/NoteType';
import { Interval } from '../../intervals/interval';
import { transpose } from '../../transpose';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { toNoteNumber } from '../../notes/toNoteName';
import { toNoteTypeNumber } from '../../notes/toNoteTypeNumber';

export type ChordSymbol = `${NoteType}${'m' | ''}`;

export type ChordType = 'M' | 'm';

export class Chord {
  readonly root: NoteType = this._getChordRoot();
  readonly type: ChordType = this._getChordType();
  readonly intervals: Interval[] = this._getChordIntervals();
  readonly noteTypes: NoteType[] = this._getNoteTypes();

  constructor(public readonly symbol: ChordSymbol) {
  }

  private _getChordRoot(): NoteType {
    return this.symbol.match(/^[A-G](?:#|b|)/)?.[0] as NoteType;
  }

  private _getChordType(): ChordType {
    return this.symbol.includes('m') ? 'm' : 'M';
  }

  private _getChordIntervals(): Interval[] {
    const intervals = [Interval.Prima];
    switch (this.type) {
      case 'm':
        intervals.push(Interval.MinorThird);
        break;
      case 'M':
        intervals.push(Interval.MajorThird);
        break;
    }
    intervals.push(Interval.PerfectFifth);
    return intervals;
  }

  private _getNoteTypes(): NoteType[] {
    return this.intervals.map(interval => transpose(this.root, interval));
  }

  getVoicing(inversion: number): Note[] {
    if (inversion - 1 > this.noteTypes.length) {
      throw new Error(`Invalid inversion ${inversion} from chord with notes ${this.noteTypes}`);
    };

    // first build the chord without inversions
    const rootNote: Note = this.root + (toNoteTypeNumber(this.root) < toNoteTypeNumber('Ab') ? '4' : '3') as Note
    const chordVoicing: Note[] = this.intervals.map(interval => transpose(rootNote, interval));

    while(inversion) {
      const lowestNote: Note = chordVoicing.shift()!;
      chordVoicing.push(transpose(lowestNote, Interval.Octave));
      inversion--;
    }

    //normalize to the right octave if needed
    if (toNoteNumber(chordVoicing[0]) > toNoteNumber('G4')) {
      return transpose(chordVoicing, -Interval.Octave);
    }

    return chordVoicing;
  }
}
