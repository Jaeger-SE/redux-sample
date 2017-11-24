import { TestBed, inject } from '@angular/core/testing';

import { CharacterDataService } from './character-data.service';

describe('CharacterDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterDataService]
    });
  });

  it(
    'should be created',
    inject([CharacterDataService], (service: CharacterDataService) => {
      expect(service).toBeTruthy();
    })
  );
});
