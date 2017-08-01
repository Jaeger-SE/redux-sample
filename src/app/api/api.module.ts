import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './mocks/in-memory-data-service';

import { CharacterDataService } from './services/character-data.service';

@NgModule({
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      host: 'localhost',
      apiBase: 'api',
      delay: 500
    })
  ],
  declarations: [],
  providers: [CharacterDataService]
})
export class ApiModule { }