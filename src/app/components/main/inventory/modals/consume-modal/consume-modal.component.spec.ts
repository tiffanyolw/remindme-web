import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeModalComponent } from './consume-modal.component';

describe('ConsumeModalComponent', () => {
  let component: ConsumeModalComponent;
  let fixture: ComponentFixture<ConsumeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
