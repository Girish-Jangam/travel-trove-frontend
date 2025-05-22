import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripItenraryComponent } from './trip-itenrary.component';

describe('TripItenraryComponent', () => {
  let component: TripItenraryComponent;
  let fixture: ComponentFixture<TripItenraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripItenraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripItenraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
