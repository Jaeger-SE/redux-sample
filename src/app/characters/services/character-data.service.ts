import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import * as _ from "lodash";

import { environment } from '../../../environments/environment'
import { Character, GroupedCharacters } from '../model';
import { LoggerService } from '../../core/services/logger.service';

@Injectable()
export class CharacterDataService {

  constructor(private http: Http, private loggerService: LoggerService) { }

  getCharacters(): Promise<Character[]> {
    return this.http.get(environment.apiUrl + '/character')
      .toPromise()
      .then(response => response.json().data as Character[])
      .catch((error) => {
        this.loggerService.debug(error);
        return Promise.reject(error.message || error);
      });
  }

  getGroupedCharacters(): Promise<GroupedCharacters[]> {
    return this.getCharacters().then((characters: Character[]) => {
      const a = _(characters).groupBy('race').map((x: _.Dictionary<Character[]>) => {
        console.log(x);
      });
      return undefined;
    });
  }
}
