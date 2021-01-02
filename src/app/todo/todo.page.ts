import { TodoService } from './todo.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { App } from '@capacitor/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {


  todos: string[] = [];

  constructor(
    public alertController: AlertController,
    private storage: Storage) {

    }

  ngOnInit() {
    // load all saved todos

    this.storage.get("todos").then((val) => {
      if (val) {
        this.todos = val;
      }
    })

  }

  onKey

    async addItem() {
      const alert = await this.alertController.create({
        cssClass: 'addItem',
        header: 'Todo hinzufügen',
        inputs: [
          {
            name: 'todo',
            placeholder: 'dein Todo..'
          }
        ],
        buttons: [
          {
          text: 'Abbrechen'  
          },
          {
          text: 'OK',
          handler: data => {
            if (data['todo'].length > 0) {
              this.todos.push(data['todo'])
              this.storage.set("todos", (this.todos));
            }            
          }
        }]
      });

      await alert.present();
    }

    editItem(todo: string) {
      let todoIndex: number = this.todos.indexOf(todo, 0)

      this.showEditItem(todoIndex)
    }

    async showEditItem(todoIndex: number) {
      const alert = await this.alertController.create({
        cssClass: 'editItem',
        header: 'Todo bearbeiten',
        inputs: [
          {
            name: 'todo',
            value: this.todos[todoIndex],
            placeholder: 'Bearbeite dein Todo..'
          }          
        ],
        buttons: [
          {
            text: 'Abbrechen'
          },
          {
            text: 'OK',
            handler: data => { 
              if (data['todo'].length > 0) {
              this.todos.splice(todoIndex, 1, data['todo'])
              this.storage.set("todos", (this.todos));
              }
            }
          }
        ]
      });

      await alert.present();
    }

    deleteItem(todo: string) {
      var index = this.todos.indexOf(todo, 0);
      if (index > -1) {
        this.todos.splice(index, 1);
        this.storage.set("todos", (this.todos));
      }
    }

    itemFinished(todo: string) {
      // add later: strikethrough text if checkbox is checked
    }

}
