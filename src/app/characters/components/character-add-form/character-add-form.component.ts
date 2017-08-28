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
import { Observable } from "rxjs";

import { DialogService } from '../../../core/modal/dialog.service';
import { DialogComponent } from '../../../core/modal/dialog.component';

import {
  SandboxService,
  Character
} from '../../sandbox.service';

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

  constructor(private modalService: DialogService, fb: FormBuilder, private sandboxService: SandboxService) {
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
    this.characters$ = this.sandboxService.characters$;
  }

  cancel(): void {
    super.close();
  }

  create(): void {
    this.isPosting = true;
    var character = this.form.value as Character;
    this.sandboxService.addCharacter(character).subscribe(
      () => {
        this.close();
      },
      (error: any) => {
        console.log(error);
        this.isPosting = false;
      })
  }
}
