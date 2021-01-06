import { TestBed, inject } from '@angular/core/testing';

import { AllitmesserviceService } from './allitmesservice.service';

describe('AllitmesserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllitmesserviceService]
    });
  });

  it('should be created', inject([AllitmesserviceService], (service: AllitmesserviceService) => {
    expect(service).toBeTruthy();
  }));
});
