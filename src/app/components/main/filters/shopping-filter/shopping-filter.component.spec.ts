import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingFilterComponent } from './shopping-filter.component';

describe('ShoppingFilterComponent', () => {
  let component: ShoppingFilterComponent;
  let fixture: ComponentFixture<ShoppingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
