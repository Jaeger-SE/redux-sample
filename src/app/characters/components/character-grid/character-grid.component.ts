import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../model';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent implements OnInit {
  @Input()
  characters: Character[];

  constructor() { }

  ngOnInit() {
  }

}
