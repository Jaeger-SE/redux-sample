import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CoreModule } from '../core/core.module';

import { environment } from '../../environments/environment';

import { InMemoryDataService } from './mocks/in-memory-data-service';
import { CharacterDataService } from './services/character-data.service';
import { CharacterViewComponent } from './components/character-view/character-view.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterGridComponent } from './components/character-grid/character-grid.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    CoreModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      host: 'localhost',
      apiBase: 'api',
      delay: 500
    }),
  ],
  declarations: [CharacterListComponent, CharacterViewComponent, CharacterCardComponent, CharacterGridComponent],
  exports: [CharacterViewComponent],
  providers: [CharacterDataService]
})
export class CharactersModule { }
