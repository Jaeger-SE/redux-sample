import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  trigger,
  animate,
  transition,
  style,
  query,
  stagger
} from '@angular/animations';
import { Observable } from "rxjs";

import { SandboxService, Character } from "../../sandbox.service";

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
  characters: Observable<Character[]>;

  constructor(private sandboxService: SandboxService) {
    this.characters = this.sandboxService.characters$;
  }

  ngOnInit() {
  }

}
