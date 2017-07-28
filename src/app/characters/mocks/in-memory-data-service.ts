import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Character } from '../model';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const characters: Character[] = [
            { id: 0, name: 'Son Goku', tag: 'son-goku', race: 'saiyan' },
            { id: 1, name: 'Bulma', tag: 'bulma', race: 'human' },
            { id: 2, name: 'Kame-Sennin', tag: 'kame-sennin', race: 'human' },
            { id: 3, name: 'Yamcha', tag: 'yamcha', race: 'human' },
            { id: 4, name: 'Kuririn', tag: 'kuririn', race: 'human' },
            { id: 5, name: 'Tenshinhan', tag: '10-shinhan', race: 'human' },
            { id: 6, name: 'Piccolo', tag: 'piccolo', race: 'namek' },
            { id: 7, name: 'Son Gohan', tag: 'son-gohan', race: 'human-saiyan' },
            { id: 8, name: 'Vegeta', tag: 'vegeta', race: 'saiyan' },
            { id: 9, name: 'Trunks', tag: 'trunks', race: 'human-saiyan' },
            { id: 10, name: 'Son Goten', tag: 'son-go-10', race: 'human-saiyan' },
            { id: 11, name: 'Pan', tag: 'pan', race: 'human-saiyan' }
        ];
        return {
            character: characters
        };
    }
}