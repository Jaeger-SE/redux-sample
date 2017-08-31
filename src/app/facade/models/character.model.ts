export class Character {
    id: number;
    name: string;
    tag: string;
    race: string;
}

export class GroupedCharacters {
    groupColor: string;
    groupName: string;
    characters: Character[];
}
