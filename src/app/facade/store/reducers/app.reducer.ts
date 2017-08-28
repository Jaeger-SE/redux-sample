import {
    Reducer,
    combineReducers
} from 'redux';

import {
    CharactersState,
    CharacterReducer
} from './character.reducer';

export * from './character.reducer';

export interface AppState {
    characters: CharactersState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    characters: CharacterReducer
});

export default rootReducer;