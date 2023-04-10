import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInstructorComponent } from './student-instructor.component';

describe('StudentInstructorComponent', () => {
  let component: StudentInstructorComponent;
  let fixture: ComponentFixture<StudentInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
