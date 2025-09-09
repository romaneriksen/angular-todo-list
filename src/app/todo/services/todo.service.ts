import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  private http = inject(HttpClient);

  // TODO replace with a get request
  // todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  // public getTodos(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(`${environment.apiUrl}`)
  // }
  getTodos(): Observable<Todo[]> { 
    // console.log("Before")
    let todos = this.http.get<Todo[]>(`${environment.apiUrl}`);
    // console.log(todos)
    return todos
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    return await firstValueFrom(this.http.post<Todo>(`${environment.apiUrl}`, {title}))
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    return await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo))
  }
}
