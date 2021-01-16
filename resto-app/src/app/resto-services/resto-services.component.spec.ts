import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoServicesComponent } from './resto-services.component';

describe('RestoServicesComponent', () => {
  let component: RestoServicesComponent;
  let fixture: ComponentFixture<RestoServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
