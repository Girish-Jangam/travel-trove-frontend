import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerariesListComponent } from './itineraries-list.component';

describe('ItinerariesListComponent', () => {
  let component: ItinerariesListComponent;
  let fixture: ComponentFixture<ItinerariesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItinerariesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItinerariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
