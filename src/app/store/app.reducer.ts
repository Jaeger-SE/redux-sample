import { Reducer, combineReducers } from 'redux';
import { CharactersState, CharacterReducer } from '../characters/store/character.reducer';
export * from '../characters/store/character.reducer';

export interface AppState {
    characters: CharactersState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    characters: CharacterReducer
});

export default rootReducer;