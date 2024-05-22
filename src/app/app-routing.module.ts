import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { allowNavigationGuard } from 'src/app/auth/allow-navigation.guard';
import { BooksCrudComponent } from 'src/app/views/books/books-crud/books-crud.component';
import { BooksListComponent } from 'src/app/views/books/books-list/books-list.component';
import { CareersCrudComponent } from 'src/app/views/careers/careers-crud/careers-crud.component';
import { CareersListComponent } from 'src/app/views/careers/careers-list/careers-list.component';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { NotFoundComponent } from 'src/app/views/not-found/not-found.component';
import { StudentsCrudComponent } from 'src/app/views/students/students-crud/students-crud.component';
import { StudentsListComponent } from 'src/app/views/students/students-list/students-list.component';
import { UsersCrudComponent } from 'src/app/views/users/users-crud/users-crud.component';
import { UsersListComponent } from 'src/app/views/users/users-list/users-list.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, canActivate: [allowNavigationGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [allowNavigationGuard]
  },
  {
    path: 'books', canActivate: [allowNavigationGuard], children: [
      { path: '', component: BooksListComponent },
      { path: 'add', component: BooksCrudComponent },
      { path: 'edit/:id', component: BooksCrudComponent }
    ]
  },
  {
    path: 'careers', canActivate: [allowNavigationGuard], children: [
      { path: '', component: CareersListComponent },
      { path: 'add', component: CareersCrudComponent },
      { path: 'edit/:id', component: CareersCrudComponent }
    ]
  },
  {
    path: 'users', canActivate: [allowNavigationGuard], children: [
      { path: '', component: UsersListComponent },
      { path: 'add', component: UsersCrudComponent },
      { path: 'edit/:id', component: UsersCrudComponent }
    ]
  },
  {
    path: 'students', canActivate: [allowNavigationGuard], children: [
      { path: '', component: StudentsListComponent },
      { path: 'add', component: StudentsCrudComponent },
      { path: 'edit/:id', component: StudentsCrudComponent }
    ]
  },
  {
    path: '**', component: NotFoundComponent, canActivate: [allowNavigationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
