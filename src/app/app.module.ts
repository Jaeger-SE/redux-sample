import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  AppState,
  default as reducer
} from './store/app.reducer';
import {
  AppStore,
  appStoreProviders
} from './store/app.store';

import { AppComponent } from './app.component';
import { CharactersModule } from './characters/characters.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CharactersModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [appStoreProviders]
})
export class AppModule { }
