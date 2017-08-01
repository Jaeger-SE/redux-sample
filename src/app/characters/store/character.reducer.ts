import { Action } from 'redux';
import { AppState } from '../../store/app.reducer';
import { Character } from '../../api/models/character';
import * as CharacterActions from './character.actions';
import { createSelector } from 'reselect';

/**
 * This file describes the state concerning Character, how to modify it through
 * the reducer, and the selectors.
 */
export interface CharacterState {
  characterList: Character[];
};

const initialState: CharacterState = {
  characterList: []
};

export const CharacterReducer = function (state: CharacterState = initialState, action: Action): CharacterState {
  switch (action.type) {
    case CharacterActions.ADD_CHARACTER:
      const character: Character = (<CharacterActions.AddCharacterAction>action).character;
      return {
        characterList: state.characterList.concat(character)
      };
    default:
      return state;
  }
};

export const getCharacterState = (state: AppState): CharacterState => state.characters;

export const getCharacterList = createSelector(
  getCharacterState,
  (state: CharacterState) => state.characterList);