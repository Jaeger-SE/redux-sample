import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgControl } from '@angular/forms';
import { Store } from 'redux';

import { Character } from '../../character.model';

import { DialogService } from '../../../core/modal/dialog.service';
import { DialogComponent } from '../../../core/modal/dialog.component';

import { AppStore } from '../../../store/app.store';
import { AppState, getCharacterList } from '../../../store/app.reducer';
import * as CharacterActions from '../../store/character.actions';

import { CharacterDataService } from '../../services/character-data.service';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss']
})
export class CharacterAddFormComponent extends DialogComponent<null, Character> implements OnInit {
  form: FormGroup;
  races: string[];
  isPosting: boolean;

  constructor( @Inject(AppStore) private store: Store<AppState>, private modalService: DialogService, fb: FormBuilder, private characterDataService: CharacterDataService) {
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
    this.characterDataService.createCharacter(character)
      .then(() => {
        this.store.dispatch(CharacterActions.addCharacter(character));
        this.close();
      })
      .catch((error: any) => {
        console.log(error);
        this.isPosting = false;
      });
  }
}
