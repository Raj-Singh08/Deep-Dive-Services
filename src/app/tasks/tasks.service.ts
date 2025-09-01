import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { Logging } from "../logging";

@Injectable({
    providedIn:'root'
})
export class TaskService{
    private tasks = signal<Task[]>([]);
    private loggingService = inject(Logging);

    allTask = this.tasks.asReadonly();
    addTask(taskData:{title:string,description:string}){
        const newTask:Task={
            ...taskData,
            id:Math.random().toString(),
            status:'OPEN'
        }
        this.tasks.update((oldTask)=>[...oldTask,newTask]);
        this.loggingService.log('Added Task'+taskData.title);
    }

    updateTaskStatus(taskId:string,newStatus:TaskStatus){
        this.tasks.update((oldTask)=>
            oldTask.map((task)=>
                task.id===taskId?{...task,status:newStatus}:task));
    }

}