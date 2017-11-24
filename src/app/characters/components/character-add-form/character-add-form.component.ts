import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ModalBaseComponent } from '../../../core/modal/modal-base.component';
import {
  CharactersSandboxService,
  Character
} from '../../../facade/sandbox/characters-sandbox.service';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss']
})
export class CharacterAddFormComponent extends ModalBaseComponent<null, Character>
  implements OnInit {
  form: FormGroup;
  races: string[];
  isPosting: boolean;
  characters$: Observable<Character[]>;

  constructor(
    fb: FormBuilder,
    private charactersSandboxService: CharactersSandboxService
  ) {
    super();
    this.isPosting = false;
    this.races = ['saiyan', 'human', 'namek', 'human-saiyan'];
    this.form = fb.group({
      name: ['', Validators.required],
      race: [undefined, Validators.required],
      tag: [undefined, Validators.maxLength(10)]
    });
  }

  ngOnInit() {
    this.characters$ = this.charactersSandboxService.characters$;
  }

  cancel(): void {
    super.close();
  }

  create(): void {
    this.isPosting = true;
    const character = this.form.value as Character;
    this.charactersSandboxService.addCharacter(character).subscribe(
      () => {
        this.close();
      },
      (error: any) => {
        console.log(error);
        this.isPosting = false;
      }
    );
  }
}
