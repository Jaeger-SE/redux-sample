import { Reducer, combineReducers } from 'redux';
import { CharacterState, CharacterReducer } from '../characters/store/character.reducer';
export * from '../characters/store/character.reducer';

export interface AppState {
    characters: CharacterState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    characters: CharacterReducer
});

export default rootReducer;