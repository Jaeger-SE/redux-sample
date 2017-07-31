import { Component, OnInit } from '@angular/core';
import { Character, GroupedCharacters } from '../../model';
import { CharacterDataService } from '../../services/character-data.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit {
  characters: Character[];

  constructor(private characterDataService: CharacterDataService) { }

  ngOnInit() {
    this.characterDataService.getCharacters().then((characters: Character[]) => {
      this.characters = characters;
    })
  }

}
