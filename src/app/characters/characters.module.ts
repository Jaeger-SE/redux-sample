// Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgPipesModule } from 'ngx-pipes';

// Mocks
import { InMemoryDataService } from './mocks/in-memory-data-service';
// Load environment variables
import { environment } from '../../environments/environment';

// Core
import { CoreModule } from '../core/core.module';
import { ModalModule } from '../core/modal/modal.module';

// Services
import { CharacterDataService } from '../facade/http/character-data.service';
import { CharactersSandboxService } from '../facade/sandbox/characters-sandbox.service';

// Components
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
    NgPipesModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      host: 'localhost',
      apiBase: 'api',
      delay: 500
    })
  ],
  declarations: [CharacterListComponent, CharacterViewComponent, CharacterCardComponent, CharacterAddComponent, CharacterAddFormComponent],
  exports: [CharacterViewComponent],
  providers: [CharactersSandboxService, CharacterDataService],
  entryComponents: [CharacterAddFormComponent]
})
export class CharactersModule { }
