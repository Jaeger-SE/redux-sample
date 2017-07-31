import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgControl } from '@angular/forms';

import { Character } from '../../model';

import { DialogService } from '../../../core/modal/dialog.service';
import { DialogComponent } from '../../../core/modal/dialog.component';

import { CharacterDataService } from '../../services/character-data.service';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss']
})
export class CharacterAddFormComponent extends DialogComponent<null, Character> implements OnInit {
  form: FormGroup;
  races: string[];

  constructor(private modalService: DialogService, fb: FormBuilder, private characterDataService: CharacterDataService) {
    super(modalService);
    this.races = [
      "saiyan",
      "human",
      "namek",
      "human-saiyan"
    ]
    this.form = fb.group({
      name: ["", Validators.required],
      race: [undefined, Validators.required]
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    super.close();
  }

  create(): void {
    var character = this.form.value as Character;
    this.characterDataService.createCharacter(character).then(() => {
      super.close();
    })
  }
}
