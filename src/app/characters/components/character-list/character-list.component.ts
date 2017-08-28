import { Component, OnInit, Inject } from '@angular/core';
import { trigger, animate, transition, style, query, stagger } from '@angular/animations';
import * as redux from 'redux';

import { AppStore } from '../../../store/app.store';
import { AppState } from '../../../store/app.reducer';
import * as CharacterActions from '../../store/character.actions';

import { Character } from '../../character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class CharacterListComponent implements OnInit {
  characters: Character[];

  constructor( @Inject(AppStore) private store: redux.Store<AppState>) {
    this.characters = [];
  }

  ngOnInit() {
    this.store.subscribe(() => {
      this.characters = this.store.getState().characters.characterList;
    });
  }

}
