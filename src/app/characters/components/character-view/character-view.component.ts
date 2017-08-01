import { Component, OnInit, Inject } from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from '../../../store/app.store';
import { AppState, getCharacterList } from '../../../store/app.reducer';
import * as CharacterActions from '../../store/character.actions';

import { Character } from '../../../api/models/character';
import { CharacterDataService } from '../../../api/services/character-data.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
  constructor( @Inject(AppStore) private store: Redux.Store<AppState>) { }

  ngOnInit() {
  }

}
