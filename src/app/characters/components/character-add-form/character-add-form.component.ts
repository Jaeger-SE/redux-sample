import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { DialogService } from '../../../core/modal/dialog.service';
import { DialogComponent } from '../../../core/modal/dialog.component';

import {
  CharactersSandboxService,
  Character
} from '../../../facade/sandbox/characters-sandbox.service';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss']
})
export class CharacterAddFormComponent extends DialogComponent<null, Character> implements OnInit {
  form: FormGroup;
  races: string[];
  isPosting: boolean;
  characters$: Observable<Character[]>;

  constructor(private modalService: DialogService, fb: FormBuilder, private charactersSandboxService: CharactersSandboxService) {
    super(modalService);
    this.isPosting = false;
    this.races = [
      'saiyan',
      'human',
      'namek',
      'human-saiyan'
    ];
    this.form = fb.group({
      name: [undefined, Validators.required],
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
      });
  }
}
