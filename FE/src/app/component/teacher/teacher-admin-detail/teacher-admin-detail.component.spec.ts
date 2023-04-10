import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAdminDetailComponent } from './teacher-admin-detail.component';

describe('TeacherAdminDetailComponent', () => {
  let component: TeacherAdminDetailComponent;
  let fixture: ComponentFixture<TeacherAdminDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAdminDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
