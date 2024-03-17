import { Routes } from '@angular/router';
import { CreateViewTaskListComponent } from './create-view-task-list/create-view-task-list.component';

export const routes: Routes = [
  { path: '', component: CreateViewTaskListComponent },
  { path: '**', redirectTo: '' } 
];
