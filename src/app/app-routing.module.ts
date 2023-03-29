import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProposalEditorComponent } from './proposal-editor/proposal-editor.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '',  component: ProjectsComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: AppComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'add-project', component: ProposalEditorComponent },
  { path: 'edit-project/:_id', component: ProposalEditorComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
