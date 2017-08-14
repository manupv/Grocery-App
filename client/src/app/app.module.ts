import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category.component';
import { EditCategoryComponent } from './categories/edit-category.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { AuthService, AlertService, CategoriesService } from './services/index';

import { TitleCasePipe } from './pipes/title-case.pipe';
import { HumanizePipe } from './pipes/humanize.pipe';

import { AlertDirective } from './directives/alert.directive';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AlertDirective,
    ProfileComponent,
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    TitleCasePipe,
    HumanizePipe,
    ModalDialogComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [AuthService, AlertService, AuthGuard, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
