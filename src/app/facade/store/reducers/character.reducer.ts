import { Action } from 'redux';
import { Character } from '../../models/character.model';
import * as CharacterActions from '../actions/character.actions';

export { Character };

export interface CharactersState {
  characterList: Character[];
};

const initialState: CharactersState = {
  characterList: []
};

export const CharacterReducer = function (state: CharactersState = initialState, action: Action): CharactersState {
  switch (action.type) {
    case CharacterActions.ADD_CHARACTER:
      const character: Character = (<CharacterActions.AddCharacterAction>action).character;
      return {
        characterList: state.characterList.concat(character)
      };
    case CharacterActions.LOAD_CHARACTER:
      const characterList: Character[] = (<CharacterActions.LoadCharacterAction>action).characterList;
      return {
        characterList: characterList
      }
    default:
      return state;
  }
};