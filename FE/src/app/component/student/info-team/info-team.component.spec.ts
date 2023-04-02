import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTeamComponent } from './info-team.component';

describe('InfoTeamComponent', () => {
  let component: InfoTeamComponent;
  let fixture: ComponentFixture<InfoTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
