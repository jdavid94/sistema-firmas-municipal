import { CustomerService } from './services/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectiveComponent } from './components/directive/directive.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/customers/form.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
// Internalizacion de Moneda, Fecha, Etc Segun Region
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
//Import From Material Desing
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { LoginComponent } from './components/login/login.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path: 'directive', component: DirectiveComponent },
  {path: 'customers', component: CustomersComponent },
  {path: 'customers/page/:page', component: CustomersComponent },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'customers/form', component: FormComponent },
  {path: 'customers/form/:id', component: FormComponent },
  {path: 'login', component: LoginComponent },
  {path: 'documents', component: DocumentsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectiveComponent,
    CustomersComponent,
    FormComponent,
    PaginatorComponent,
    ProfileDetailsComponent,
    LoginComponent,
    DocumentsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    [RouterModule.forRoot(routes)],
    [MatDatepickerModule, MatNativeDateModule],
  ],
  exports: [RouterModule],
  providers: [
    CustomerService,
    {provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
