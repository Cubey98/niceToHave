import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private storage: Storage) { }

  saveTodos(todos: string[]) {
    this.storage.set("todos", todos)
  }

  loadTodos() {
    return this.storage.get("todos");
  }

}
