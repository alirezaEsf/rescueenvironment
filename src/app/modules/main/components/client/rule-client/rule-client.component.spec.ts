import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleClientComponent } from './rule-client.component';

describe('RuleClientComponent', () => {
  let component: RuleClientComponent;
  let fixture: ComponentFixture<RuleClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
