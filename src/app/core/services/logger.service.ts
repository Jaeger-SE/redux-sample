import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoggerService {
  constructor() {}

  debug(error: any): void {
    if (environment.debug) {
      console.log('An error occurred', error);
    }
  }
}
