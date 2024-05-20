import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { UnauthInterceptor } from 'src/app/interceptor/unauth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './views/login/login.component';
import { MaterialIconComponent } from './components/material-icon/material-icon.component';
import { ToastComponent } from './components/toast/toast.component';
import { HomeComponent } from './views/home/home.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BooksCrudComponent } from './views/books/books-crud/books-crud.component';
import { BooksListComponent } from './views/books/books-list/books-list.component';
import { FormLabelComponent } from './components/form-label/form-label.component';
import { CrudFooterComponent } from './components/crud-footer/crud-footer.component';
import { SingleDatePickerComponent } from './components/single-date-picker/single-date-picker.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CareersCrudComponent } from './views/careers/careers-crud/careers-crud.component';
import { CareersListComponent } from './views/careers/careers-list/careers-list.component';
import { UsersCrudComponent } from './views/users/users-crud/users-crud.component';
import { UsersListComponent } from './views/users/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MaterialIconComponent,
    ToastComponent,
    HomeComponent,
    SideBarComponent,
    BooksCrudComponent,
    BooksListComponent,
    FormLabelComponent,
    CrudFooterComponent,
    SingleDatePickerComponent,
    PaginationComponent,
    CareersCrudComponent,
    CareersListComponent,
    UsersCrudComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
