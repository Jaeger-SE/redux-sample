import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Redux from 'redux';
import { chain } from 'lodash';

import { AppStore } from '../../store/app.store';
import { AppState, getCharacterList } from '../../store/app.reducer';
import * as CharacterActions from '../store/character.actions';

import { CharacterDataService, Character, GroupedCharacters } from "../../api/services/character-data.service";

export { Character, GroupedCharacters };

@Injectable()
export class CharacterService {

  characterList: Observable<Character[]>;

  constructor(private characterDataService: CharacterDataService, @Inject(AppStore) private store: Redux.Store<AppState>) {
    this.characterList = this.characterDataService.getCharacters();
  }

  createUser(character: Character): Promise<void> {
    return this.characterDataService.createCharacter(character).toPromise().then(() => {
      this.store.dispatch(CharacterActions.addCharacter(character));
    });
  }

  getGroupedCharacters(): Observable<GroupedCharacters[]> {
    return this.characterList.map((characters: Character[]) => {
      return chain(characters).groupBy((c: Character) => c.race).map((characterList: Character[], key: string) => {
        return {
          groupName: key,
          groupColor: "#FFCC00",
          characters: characterList
        };
      }).value();
    });
  }
}
