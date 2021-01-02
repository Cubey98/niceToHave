import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private storage: Storage) { }

  saveTodos(products: string[]) {
    this.storage.set("products", products)
  }

  loadTodos() {
    return this.storage.get("products");
  }

}
