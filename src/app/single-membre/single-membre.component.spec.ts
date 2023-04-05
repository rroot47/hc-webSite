import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMembreComponent } from './single-membre.component';

describe('SingleMembreComponent', () => {
  let component: SingleMembreComponent;
  let fixture: ComponentFixture<SingleMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMembreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
