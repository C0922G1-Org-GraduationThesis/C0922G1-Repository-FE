import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAdminUpdateComponent } from './teacher-admin-update.component';

describe('TeacherAdminUpdateComponent', () => {
  let component: TeacherAdminUpdateComponent;
  let fixture: ComponentFixture<TeacherAdminUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAdminUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAdminUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
