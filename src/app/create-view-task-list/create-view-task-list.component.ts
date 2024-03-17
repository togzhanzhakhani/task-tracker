import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-create-view-task-list',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatIconModule,
    MatMomentDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './create-view-task-list.component.html',
  styleUrl: './create-view-task-list.component.scss'
})

export class CreateViewTaskListComponent {
  @Input() taskAssignees: FormControl;
  separatorKeysCodes: number[] = [ENTER, SPACE];
  tasks: Task[] = [];
  isNewTaskFormVisible: boolean = false;
  newTask: Task = { id: 0, title: '', deadline: new Date(), priority: 'High', status: 'On Track', assignees: ['Togzhan'] };
  editingTaskIndex: number | null = null;
  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['On Track', 'At Risk', 'Off Track'];
  

  constructor(private taskService: TaskService) { 
    this.taskAssignees = new FormControl(); 
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  toggleNewTaskForm(): void {
    if (!this.editingTaskIndex) {
      this.isNewTaskFormVisible = !this.isNewTaskFormVisible;
    }
  }

  editTask(index: number): void {
    if (!this.isNewTaskFormVisible) {
      this.editingTaskIndex = index;
    }
  }

  saveTask(): void {
    if (this.editingTaskIndex !== null) {
      const editedTask = this.tasks[this.editingTaskIndex];
      this.taskService.updateTask(editedTask, this.editingTaskIndex);
      this.editingTaskIndex = null;
    }
  }

  saveNewTask(): void {
    if (this.newTask.title.trim() !== '') {
      this.taskService.addTask({ ...this.newTask, id: this.tasks.length + 1 });
      this.newTask = { id: 0, title: '', deadline: new Date(), priority: 'High', status: 'On Track', assignees: ['Togzhan'] };
      this.isNewTaskFormVisible = false;
      this.tasks = this.taskService.getTasks();
    }
  }

  addAssignee(event: MatChipInputEvent, task: Task): void {
    const input = event.input;
    const value = (event.value || '').trim();
  
    if (value) {
      task.assignees.push(value);
    }
  
    if (input) {
      input.value = '';
    }
  }
  
  
  removeAssignee(index: number): void {
    if (index >= 0) {
      let currentAssignees = this.taskAssignees.value as string[]; 
      if (!Array.isArray(currentAssignees)) {
        currentAssignees = [];
      }
      const updatedAssignees = currentAssignees.filter((_, i) => i !== index);
      this.taskAssignees.setValue(updatedAssignees);
    }
  }
}
