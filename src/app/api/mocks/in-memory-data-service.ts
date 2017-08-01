import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Character } from '../models/character';
import { characterList as characterListMock } from './characters-mock';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        return {
            character: characterListMock
        };
    }
}