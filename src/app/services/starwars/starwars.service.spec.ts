import { TestBed } from '@angular/core/testing';

import { StarwarsService } from './starwars.service';

describe('StarwarsService', () => {
  let service: StarwarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarwarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
