import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRulesClientComponent } from './search-rules-client.component';

describe('SearchRulesClientComponent', () => {
  let component: SearchRulesClientComponent;
  let fixture: ComponentFixture<SearchRulesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRulesClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRulesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
