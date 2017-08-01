import { Component, OnInit, Inject } from '@angular/core';
import { Store } from 'redux';

import { AppStore } from '../../../store/app.store';
import { AppState, getCharacterList } from '../../../store/app.reducer';
import * as CharacterActions from '../../store/character.actions';

import { Character, GroupedCharacters } from '../../character.model';
import { CharacterDataService } from '../../services/character-data.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
  constructor( @Inject(AppStore) private store: Store<AppState>, private characterDataService: CharacterDataService) { }

  ngOnInit() {
    this.characterDataService.getCharacters().then(characters => {
      this.store.dispatch(CharacterActions.loadCharacter(characters));
    })
  }

}
