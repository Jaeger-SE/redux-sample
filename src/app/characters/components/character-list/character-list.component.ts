import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Character } from '../../../api/models/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Observable<Character[]>;

  constructor(private characterService: CharacterService) {
    this.characters = this.characterService.characterList;
  }

  ngOnInit() {
    
  }

}
