import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { Character, GroupedCharacters } from '../models/grouped-characters';
export { Character, GroupedCharacters };

@Injectable()
export class CharacterDataService {
  constructor(private http: Http) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get(environment.apiUrl + '/character')
      .map(response => response.json().data as Character[]);
  }

  createCharacter(character: Character): Observable<void> {
    return this.http.post(environment.apiUrl + "/character", character).map(() => {});
  }
}
