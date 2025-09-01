import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private tasksService = inject(TaskService);
  private selectedFilter = signal<string>('all');
  tasks=computed(()=>{
    switch(this.selectedFilter()){
      case 'all':
        return this.tasksService.allTask();
      case 'open':
        return this.tasksService.allTask().filter(task=>task.status==='OPEN');
      case 'done':
        return this.tasksService.allTask().filter(task=>task.status==='DONE');
      case 'in-progress':
        return this.tasksService.allTask().filter(task=>task.status==='IN_PROGRESS');
      default:
        return this.tasksService.allTask();
    }
  });

  

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
    
  }
}
