import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { ContentHomeComponent } from './content-home/content-home.component';
import { SignupComponent } from './signup/signup.component';
import {SigninComponent} from "./signin/signin.component";
import { HeaderComponent } from './header/header.component';
import { ZFooterComponent } from './footer/zfooter.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RequestInterceptorService} from "./services/requestInterceptor.service";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth.guard.service";
import { AdherentComponent } from './adherent/adherent.component';
import { DetteComponent } from './dette/dette.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DepenseComponent } from './depense/depense.component';
import { ListMembreComponent } from './list-membre/list-membre.component';
import { VerifyAcountComponent } from './verify-acount/verify-acount.component';
import { FormDepenseComponent } from './form-depense/form-depense.component';
import { EditMembreComponent } from './edit-membre/edit-membre.component';

const routes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
 /* {path: 'verify-acount', component: VerifyAcountComponent},*/
  {path : 'admin', component:AdminPageComponent, canActivate:[AuthGuardService], children:[
      {path : 'list-membre', component:ListMembreComponent},
      {path : 'adherent', component:AdherentComponent},
      {path : 'dette', component:DetteComponent},
      {path : 'depense', component:DepenseComponent},
      {path:'add-depense', component:FormDepenseComponent},
      {path : 'edit-membre/:id', component:EditMembreComponent},
      {path: 'verify-acount', component: VerifyAcountComponent},
    ]
  },
  {path : '', redirectTo : 'home', pathMatch : 'full'},
  {path : '**', redirectTo : 'home'},
]

/*canActivate:[AuthGuardService], children:[
  {path : 'adherent', component:AdherentComponent},
  {path : 'member', component:MembreComponent},
  {path : 'dette', component:DetteComponent},
  {path : 'depense', component:DepenseComponent,/!* canActivate:[RoleGuardService]*!/},
{path : 'edit-member/:id', component:EditMembreComponent}*!/
]*/
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentHomeComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    ZFooterComponent,
    AdminPageComponent,
    AdherentComponent,
    DetteComponent,
    DepenseComponent,
    ListMembreComponent,
    VerifyAcountComponent,
    FormDepenseComponent,
    EditMembreComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule, HttpClientModule
  ],
  providers:[AuthService ,{provide:HTTP_INTERCEPTORS, useClass:RequestInterceptorService, multi:true}],
  bootstrap:[AppComponent]
})
export class AppModule { }
