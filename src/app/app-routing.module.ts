
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ProfileComponent } from './home/profile/profile.component';
import { FormateurApprenantComponent } from './home/formateur-apprenant/formateur-apprenant.component';
import { AddComponent } from './home/formateur-apprenant/add/add.component';
import { FormationComponent } from './home/formation/formation.component';
import { DetailComponent } from './home/formation/detail/detail.component';
import { StepsComponent } from './home/formation/steps/steps.component';
import { ClientComponent } from './home/client/client.component';
import { EditComponent } from './home/client/edit/edit.component';
import { ErrorComponent } from './home/error/error.component';
import { DemandeComponent } from './home/demande/demande.component';

import { PlanificationComponent } from './home/planification/planification.component';
import { TestComponent } from './home/test/test.component';
import { CoursComponent } from './home/formation/cours/cours.component';

import { ListQuestionComponent } from './home/formation/steps/list-question/list-question.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { ArchiveComponent } from './home/formation/archive/archive.component';
import { ListComponent } from './home/formateur-apprenant/list/list.component';
import { CodeVerificationComponent } from './home/forgot-password/code-verification/code-verification.component';
import { ResetPasswordComponent } from './home/forgot-password/reset-password/reset-password.component'; // a plugin!
import { ChattComponent } from './home/chatt/chatt.component';
import { ResultofQuizComponent } from './home/formation/resultof-quiz/resultof-quiz.component'; // a plugin!
import { FormteurFormtionComponent } from './home/formtion/formteur-formtion/formteur-formtion.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutGuard } from './guards/logout.guard'
import { ArchiveeComponent } from './home/formtion/archivee/archivee.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { ResultComponent } from './home/formation/result/result.component';
const routes: Routes = [
    {path:"login",component:LoginComponent ,canActivate:[LogoutGuard]},
 
    {path:"forgotpassword",component:ForgotPasswordComponent},
    {path:"codeVerification",component:CodeVerificationComponent},
    {path:"Restpassword",component:ResetPasswordComponent},
    {path:"home",component:DashboardComponent,children:[

         {path:"profile",component:ProfileComponent},
         {path:"formateur_Apprenant",component:FormateurApprenantComponent},
         {path:"formateur_App/:id",component:FormateurApprenantComponent},
         {path:"add",component:AddComponent},
         {path:"formateur-formation",component:FormteurFormtionComponent},
         {path:"formation",component:FormationComponent},
         {path:"detailformation/:id",component:DetailComponent},
         {path:"chatt",component:ChattComponent},
          {path:"theme/:id",component:StepsComponent},
          {path:"test",component:TestComponent},
          {path:"editCours/:id",component:StepsComponent},
          {path:"listclient",component:ClientComponent},
          {path:"editUser/:id",component:EditComponent},
         {path:"AddComponent",component:AddComponent},
         {path:"calendrier",component:CalendarComponent},
         {path:"List-Result",component:ResultofQuizComponent},
        //  {path:"list/:id",component:ListQuestionComponent,children:[
        //   {path:"list-update/:id",component:ListQuestionComponent},
        //  ]},
        
        {path:"list/:id",component:ListQuestionComponent},
        {path:"list-update/:id",component:ListQuestionComponent},
        {path:"listResult/:id",component:ResultComponent},
  
         {path:"planification",component:PlanificationComponent},

         {path:"cour",component:CoursComponent},
         {path:"listOfRequest",component:DemandeComponent},

         {path:"archive",component:ArchiveComponent},

         {path:"list",component:ListComponent},
       ]},
       {path:"**",component:ErrorComponent}
    
    ]
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule { }
    