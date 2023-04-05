import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/shared/home/home.component';
import {AdminGuard} from './component/login/security/admin.guard';
import {TeacherGuard} from './component/login/security/teacher.guard';
import {StudentGuard} from './component/login/security/student.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {path: 'accounts', loadChildren: () => import('./component/account/account.module').then(module => module.AccountModule)},
  {path: 'documents', loadChildren: () => import('./component/document/document.module').then(module => module.DocumentModule)},
  {
    path: 'notifications',
    loadChildren: () => import('./component/notification/notification.module').then(module => module.NotificationModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./component/progress/progress.module').then(module => module.ProgressModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./component/project/project.module').then(module => module.ProjectModule)
  },
  {
    canActivate: [StudentGuard],
    path: 'students',
    loadChildren: () => import('./component/student/student.module').then(module => module.StudentModule)
  },
  {
    canActivate: [TeacherGuard],
    path: 'teachers',
    loadChildren: () => import('./component/teacher/teacher.module').then(module => module.TeacherModule)
  },
  {
    path: 'topics',
    loadChildren: () => import('./component/topic/topic.module').then(module => module.TopicModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./component/login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'error-page',
    loadChildren: () => import('./component/error-page/error-page.module').then(module => module.ErrorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
