import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdropComponent } from './testdrop.component';

describe('TestdropComponent', () => {
  let component: TestdropComponent;
  let fixture: ComponentFixture<TestdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestdropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
