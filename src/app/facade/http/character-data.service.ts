import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { chain } from 'lodash';

import { environment } from '../../../environments/environment';
import { Character, GroupedCharacters } from '../models/character.model';
import { LoggerService } from '../../core/services/logger.service';

export * from '../models/character.model';

@Injectable()
export class CharacterDataService {

  constructor(private http: Http, private loggerService: LoggerService) { }

  getCharacters(): Observable<Character[]> {
    return this.http.get(environment.apiUrl + '/character')
      .map(response => response.json().data as Character[])
      .catch((error) => {
        this.loggerService.debug(error);
        return Observable.throw(error.json().data.message || error);
      });
  }

  getGroupedCharacters(): Observable<GroupedCharacters[]> {
    return this.getCharacters().map((characters: Character[]) => {
      return chain(characters).groupBy((c: Character) => c.race).map((characterList: Character[], key: string) => {
        return <GroupedCharacters>{
          groupName: key,
          groupColor: '#FFCC00',
          characters: characterList
        };
      }).value();
    });
  }

  createCharacter(character: Character): Observable<void> {
    return this.http.post(environment.apiUrl + '/character', character)
      .catch((error) => {
        this.loggerService.debug(error);
        return Observable.throw(error.json().data.message || error);
      });
  }
}
