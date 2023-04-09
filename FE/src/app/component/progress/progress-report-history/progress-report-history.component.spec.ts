import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressReportHistoryComponent } from './progress-report-history.component';

describe('ProgressReportHistoryComponent', () => {
  let component: ProgressReportHistoryComponent;
  let fixture: ComponentFixture<ProgressReportHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressReportHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressReportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
