import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksCrudComponent } from 'src/app/views/books/books-crud/books-crud.component';
import { BooksListComponent } from 'src/app/views/books/books-list/books-list.component';
import { CareersCrudComponent } from 'src/app/views/careers/careers-crud/careers-crud.component';
import { CareersListComponent } from 'src/app/views/careers/careers-list/careers-list.component';
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginComponent } from 'src/app/views/login/login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'books', children: [
      { path: '', component: BooksListComponent },
      { path: 'add', component: BooksCrudComponent },
      { path: 'edit/:id', component: BooksCrudComponent }
    ]
  },
  {
    path: 'careers', children: [
      { path: '', component: CareersListComponent },
      { path: 'add', component: CareersCrudComponent },
      { path: 'edit/:id', component: CareersCrudComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
