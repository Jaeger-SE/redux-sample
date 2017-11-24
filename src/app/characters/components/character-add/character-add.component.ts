import { Component, OnInit } from '@angular/core';

// Import modal dependencies
import { ModalService } from '../../../core/modal/modal.service';

// Import component used as content in the modal
import { CharacterAddFormComponent } from '../character-add-form/character-add-form.component';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss']
})
export class CharacterAddComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  create(): void {
    this.modalService.addDialog(CharacterAddFormComponent, undefined, {
      closeByEscapeKeyPressed: true,
      closeByClickingOutside: true
    });
  }
}
