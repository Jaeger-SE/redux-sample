import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgControl } from '@angular/forms';

import { Character, CharacterService } from '../../services/character.service';

import { DialogService } from '../../../core/modal/dialog.service';
import { DialogComponent } from '../../../core/modal/dialog.component';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss']
})
export class CharacterAddFormComponent extends DialogComponent<null, Character> implements OnInit {
  form: FormGroup;
  races: string[];
  isPosting: boolean;

  constructor(private modalService: DialogService, private characterService: CharacterService, fb: FormBuilder) {
    super(modalService);
    this.isPosting = false;
    this.races = [
      "saiyan",
      "human",
      "namek",
      "human-saiyan"
    ]
    this.form = fb.group({
      name: ["", Validators.required],
      race: [undefined, Validators.required],
      tag: [undefined, Validators.maxLength(10)]
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    super.close();
  }

  create(): void {
    this.isPosting = true;
    var character = this.form.value as Character;
    this.characterService.createUser(character).then(() => {
      this.close();
    });
  }
}
