import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTeacherCreateComponent } from './notification-teacher-create.component';

describe('NotificationTeacherCreateComponent', () => {
  let component: NotificationTeacherCreateComponent;
  let fixture: ComponentFixture<NotificationTeacherCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationTeacherCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTeacherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
