import {
    Action,
    ActionCreator
} from 'redux';
import {
    Character
} from '../../models/character.model';

export * from '../../models/character.model';

export const ADD_CHARACTER = '[Character] Add character';
export interface AddCharacterAction extends Action {
    character: Character;
}
export const addCharacter: ActionCreator<AddCharacterAction> =
    (character: Character) => ({
        type: ADD_CHARACTER,
        character: character
    });


export const LOAD_CHARACTER = '[Character] Load character';
export interface LoadCharacterAction extends Action {
    characterList: Character[];
}
export const loadCharacter: ActionCreator<LoadCharacterAction> =
    (characterList: Character[]) => ({
        type: LOAD_CHARACTER,
        characterList: characterList
    });
