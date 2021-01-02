import { async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoPage } from '../todo/todo.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: TodoPage,
      componentProps: { isModal: true }
    });
  }

}
