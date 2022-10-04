import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './home/profile/profile.component';
import { FormateurApprenantComponent } from './home/formateur-apprenant/formateur-apprenant.component';
import { AddComponent } from './home/formateur-apprenant/add/add.component';
import { FormationComponent } from './home/formation/formation.component';
import { DetailComponent } from './home/formation/detail/detail.component';
import { DatePipe } from '@angular/common';
import { StepsComponent } from './home/formation/steps/steps.component';
import { RechercheMembrePipe } from './pipes/recherche-membre.pipe';

import { ClientComponent } from './home/client/client.component';
import { EditComponent } from './home/client/edit/edit.component';
import { ErrorComponent } from './home/error/error.component';
import { DemandeComponent } from './home/demande/demande.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import { CoursComponent } from './home/formation/cours/cours.component';
import { PlanificationComponent } from './home/planification/planification.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { TestComponent } from './home/test/test.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { ListQuestionComponent } from './home/formation/steps/list-question/list-question.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { ArchiveComponent } from './home/formation/archive/archive.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { ListComponent } from './home/formateur-apprenant/list/list.component';
import { CodeVerificationComponent } from './home/forgot-password/code-verification/code-verification.component';
import { ResetPasswordComponent } from './home/forgot-password/reset-password/reset-password.component';

import { ResultofQuizComponent } from './home/formation/resultof-quiz/resultof-quiz.component';
import { ChatComponent } from './home/chat/chat.component';
import { VideoConfComponent } from './home/video-conf/video-conf.component';
import { ChattComponent } from './home/chatt/chatt.component';
import { FormteurFormtionComponent } from './home/formtion/formteur-formtion/formteur-formtion.component';
import { ArchiveeComponent } from './home/formtion/archivee/archivee.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { ResultComponent } from './home/formation/result/result.component';




FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    ProfileComponent,
    FormateurApprenantComponent,
    AddComponent,
    FormationComponent,
    DetailComponent,
    StepsComponent,
    RechercheMembrePipe,
    

    ClientComponent,
     EditComponent,
     ErrorComponent,
     DemandeComponent,

     CoursComponent,
     PlanificationComponent,
     TestComponent,
     ListQuestionComponent,
     ForgotPasswordComponent,
     ArchiveComponent,
     ListComponent,
     CodeVerificationComponent,
     ResetPasswordComponent,

     ResultofQuizComponent,
     ChatComponent,
     VideoConfComponent,
     ChattComponent,
     FormteurFormtionComponent,
     ArchiveeComponent,
     CalendarComponent,
     ResultComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    FullCalendarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
