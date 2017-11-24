import { InjectionToken } from '@angular/core';
import * as redux from 'redux';

import { AppState, default as reducer } from './reducers/app.reducer';

export const AppStore = new InjectionToken('App.store');

const devtools: redux.StoreEnhancer<AppState> = window['devToolsExtension']
  ? window['devToolsExtension']()
  : f => f;

export function createAppStore(): redux.Store<AppState> {
  return redux.createStore<AppState>(reducer, redux.compose(devtools));
}

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
];
