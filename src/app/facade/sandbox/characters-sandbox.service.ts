import { Injectable, Inject } from '@angular/core';
import { Store } from 'redux';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Redux
import { AppStore } from '../store/app.store';
import { AppState } from '../store/reducers/app.reducer';
import * as CharacterActions from '../store/actions/character.actions';

import {
  Character,
  CharacterDataService
} from '../http/character-data.service';

export { Character };

@Injectable()
export class CharactersSandboxService {
  private _characters: BehaviorSubject<Character[]>;

  public readonly characters$: Observable<Character[]>;

  constructor(
    @Inject(AppStore) private store: Store<AppState>,
    private characterDataService: CharacterDataService
  ) {
    this._characters = new BehaviorSubject<Character[]>([]);
    this.characters$ = this._characters.asObservable();

    this.characterDataService.getCharacters().subscribe(res => {
      this._characters.next(res);
    });
  }

  addCharacter(character: Character): Observable<void> {
    const obs = this.characterDataService.createCharacter(character);
    obs.subscribe(res => {
      this._characters.next(this._characters.getValue().concat(character));
      this.store.dispatch(CharacterActions.addCharacter(character));
    });
    return obs;
  }
}
