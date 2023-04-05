import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccountModule} from './component/account/account.module';
import {DocumentModule} from './component/document/document.module';
import {NotificationModule} from './component/notification/notification.module';
import {ProgressModule} from './component/progress/progress.module';
import {ProjectModule} from './component/project/project.module';
import {SharedModule} from './component/shared/shared.module';
import {StudentModule} from './component/student/student.module';
import {TeacherModule} from './component/teacher/teacher.module';
import {TopicModule} from './component/topic/topic.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {CKEditorModule} from 'ckeditor4-angular';
import { ProgressReportHistoryComponent } from './component/progress/progress-report-history/progress-report-history.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ProgressReportHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    DocumentModule,
    NotificationModule,
    ProgressModule,
    ProjectModule,
    SharedModule,
    StudentModule,
    TeacherModule,
    TopicModule,
    HttpClientModule,
    NgxPaginationModule,
    CKEditorModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
