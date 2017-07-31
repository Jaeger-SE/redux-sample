import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgControl } from '@angular/forms';

import { Character } from '../../model';

import { DialogService } from '../../../core/modal/dialog.service';
import { DialogComponent } from '../../../core/modal/dialog.component';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss']
})
export class CharacterAddFormComponent extends DialogComponent<null, Character> implements OnInit {
  form: FormGroup;

  constructor(private modalService: DialogService, fb: FormBuilder) {
    super(modalService);
    this.form = fb.group({
      name: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  cancel(): void {
    super.close();
  }
}
