import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../core/modal/dialog.service';

import { CharacterAddFormComponent } from '../character-add-form/character-add-form.component';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss']
})
export class CharacterAddComponent implements OnInit {

  constructor(private modalService: DialogService) { }

  ngOnInit() {
  }

  create(): void {
    this.modalService.addDialog(CharacterAddFormComponent, undefined);
  }
}
