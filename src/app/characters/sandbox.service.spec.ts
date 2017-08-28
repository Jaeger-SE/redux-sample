import { TestBed, inject } from '@angular/core/testing';

import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SandboxService]
    });
  });

  it('should be created', inject([SandboxService], (service: SandboxService) => {
    expect(service).toBeTruthy();
  }));
});
