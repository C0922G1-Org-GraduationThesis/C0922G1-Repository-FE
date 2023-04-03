import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgressRoutingModule} from './progress-routing.module';
import {ProjectManagementComponent} from './project-management/project-management.component';
import {HttpClientModule} from '@angular/common/http';
import {ProgressDetailComponent} from './progress-detail/progress-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ckeditor4-angular';



@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProgressDetailComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class ProgressModule {
}
