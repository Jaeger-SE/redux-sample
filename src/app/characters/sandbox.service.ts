import {
  Injectable,
  Inject
} from '@angular/core';
import * as redux from "redux";
import {
  BehaviorSubject,
  Observable
} from "rxjs";

// Redux
import { AppStore } from '../store/app.store';
import { AppState } from '../store/app.reducer';
import * as CharacterActions from './store/character.actions';

import {
  Character,
  CharacterDataService
} from "./services/character-data.service";

export { Character };

@Injectable()
export class SandboxService {

  private _characters: BehaviorSubject<Character[]>;

  public readonly characters$: Observable<Character[]>;

  constructor( @Inject(AppStore) private store: redux.Store<AppState>, private characterDataService: CharacterDataService) {
    this._characters = new BehaviorSubject<Character[]>([]);
    this.characters$ = this._characters.asObservable();

    this.characterDataService.getCharacters().subscribe(res => {
      this._characters.next(res);
    })
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
