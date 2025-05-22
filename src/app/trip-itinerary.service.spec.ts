import { TestBed } from '@angular/core/testing';

import { TripItineraryService } from './trip-itinerary.service';

describe('TripItineraryService', () => {
  let service: TripItineraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripItineraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
