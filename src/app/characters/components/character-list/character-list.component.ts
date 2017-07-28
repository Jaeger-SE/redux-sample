import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  @Input()
  characters: Character[];

  constructor() {
  }

  ngOnInit() {

  }

}
