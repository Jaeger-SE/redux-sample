import { TestBed, inject } from '@angular/core/testing';

import { CharactersSandboxService } from './characters-sandbox.service';

describe('SandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharactersSandboxService]
    });
  });

  it(
    'should be created',
    inject([CharactersSandboxService], (service: CharactersSandboxService) => {
      expect(service).toBeTruthy();
    })
  );
});
