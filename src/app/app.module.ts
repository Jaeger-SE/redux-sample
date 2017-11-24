import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AppState,
  default as reducer
} from './facade/store/reducers/app.reducer';
import { AppStore, appStoreProviders } from './facade/store/app.store';

import { AppComponent } from './app.component';
import { CharactersModule } from './characters/characters.module';
import { TestAnimationComponent } from './test-animation/test-animation.component';

@NgModule({
  declarations: [AppComponent, TestAnimationComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CharactersModule],
  bootstrap: [AppComponent],
  providers: [appStoreProviders]
})
export class AppModule {}
