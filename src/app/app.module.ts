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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UserDetailComponent } from './components/users/user-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SearchComponent } from './components/search/search.component';
import { DetalleComponent } from './components/documents/detalle.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { HomeComponent } from './components/home/home.component';
import {DatePipe} from '@angular/common';
import { GestorDocumentosComponent } from './components/documents/gestor-documentos.component';


const routes: Routes = [
  {path: 'directive', component: DirectiveComponent },
  {path: 'customers', component: CustomersComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'users', component: UsersComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'users/detail', component: UserDetailComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'users/detail/:id', component: UserDetailComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'solicitudes', component: SolicitudComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'customers/page/:page', component: CustomersComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'customers/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'customers/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  {path: 'login', component: LoginComponent },
  {path: 'documents', component: DocumentsComponent, canActivate:[AuthGuard]},
  {path: 'documents/:id', component: DetalleComponent, canActivate:[AuthGuard]},
  {path: 'gestor', component: GestorDocumentosComponent, canActivate:[AuthGuard]},
  {path: 'gestor/:id', component: DocumentsComponent, canActivate:[AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
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
    UsersComponent,
    SearchComponent,
    DetalleComponent,
    SolicitudComponent,
    HomeComponent,
    UserDetailComponent,
    GestorDocumentosComponent
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
    DatePipe,
    {provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
