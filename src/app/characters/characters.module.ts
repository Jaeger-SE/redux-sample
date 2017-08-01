import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '../core/core.module';
import { ModalModule } from '../core/modal/modal.module';
import { ApiModule } from '../api/api.module';

import { environment } from '../../environments/environment';

import { CharacterService } from './services/character.service';

import { CharacterViewComponent } from './components/character-view/character-view.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterAddComponent } from './components/character-add/character-add.component';
import { CharacterAddFormComponent } from './components/character-add-form/character-add-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CoreModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ApiModule
  ],
  declarations: [CharacterListComponent, CharacterViewComponent, CharacterCardComponent, CharacterAddComponent, CharacterAddFormComponent],
  exports: [CharacterViewComponent],
  providers: [CharacterService],
  entryComponents: [CharacterAddFormComponent]
})
export class CharactersModule { }
