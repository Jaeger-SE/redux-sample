import { Component, OnInit, Input } from '@angular/core';
import { GroupedCharacters } from '../../model';

@Component({
  selector: 'app-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent implements OnInit {
  @Input()
  characterGroups: GroupedCharacters[];

  constructor() { }

  ngOnInit() {
  }

}
