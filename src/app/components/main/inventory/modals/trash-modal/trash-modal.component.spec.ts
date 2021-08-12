import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashModalComponent } from './trash-modal.component';

describe('TrashModalComponent', () => {
  let component: TrashModalComponent;
  let fixture: ComponentFixture<TrashModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
