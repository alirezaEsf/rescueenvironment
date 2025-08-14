import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateWayLoginComponent } from './gate-way-login.component';

describe('GateWayLoginComponent', () => {
  let component: GateWayLoginComponent;
  let fixture: ComponentFixture<GateWayLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateWayLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateWayLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
