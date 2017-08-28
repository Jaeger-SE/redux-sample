import { Component, OnInit, Inject } from '@angular/core';
import * as redux from 'redux';

import { AppStore } from '../../../store/app.store';
import { AppState, getCharacterList } from '../../../store/app.reducer';
import * as CharacterActions from '../../store/character.actions';

import { Character } from '../../character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Character[];

  constructor(@Inject(AppStore) private store: redux.Store<AppState>) {
  }

  ngOnInit() {
    this.store.subscribe(() => {
      this.characters = getCharacterList(this.store.getState());
    });
  }

}
