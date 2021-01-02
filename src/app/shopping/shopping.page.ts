import { ShoppingService } from './shopping.service';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { App } from '@capacitor/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

  products: string[] = [];

  constructor(
    public alertController: AlertController,
    private storage: Storage) {
  
    }

    ngOnInit() {
      // load all saved todos
  
      this.storage.get("products").then((val) => {
        if (val) {
          this.products = val;
        }
      })
  
    }

    onKey

    async addItem() {
      const alert = await this.alertController.create({
        cssClass: 'addItem',
        header: 'Produkt hinzufügen',
        inputs: [
          {
            name: 'product',
            placeholder: 'dein Produkt..'
          }
        ],
        buttons: [
          {
          text: 'Abbrechen'  
          },
          {
          text: 'OK',
          handler: data => {
            if (data['product'].length > 0) {
              this.products.push(data['product'])
              this.storage.set("products", (this.products));
            }            
          }
        }]
      });

      await alert.present();
    }

    editItem(product: string) {
      let productIndex: number = this.products.indexOf(product, 0)

      this.showEditItem(productIndex)
    }

    async showEditItem(productIndex: number) {
      const alert = await this.alertController.create({
        cssClass: 'editItem',
        header: 'Produkt bearbeiten',
        inputs: [
          {
            name: 'product',
            value: this.products[productIndex],
            placeholder: 'Bearbeite dein Produkt..'
          }          
        ],
        buttons: [
          {
            text: 'Abbrechen'
          },
          {
            text: 'OK',
            handler: data => { 
              if (data['product'].length > 0) {
              this.products.splice(productIndex, 1, data['product'])
              this.storage.set("products", (this.products));
              }
            }
          }
        ]
      });

      await alert.present();
    }

    deleteItem(product: string) {
      var index = this.products.indexOf(product, 0);
      if (index > -1) {
        this.products.splice(index, 1);
        this.storage.set("products", (this.products));
      }
    }

    itemFinished(product: string) {
      /*
      var checkbox = document.getElementById('itemCheckbox');
      
      // this.products[productIndex]

      if (!checkbox.checked) {
        var index = this.products.indexOf(product, 0);
        if (index > -1) {
          this.products.splice(index, 1, "durchgestrichen");
          this.storage.set("products", (this.products));
        }
      } else {
        var index = this.products.indexOf(product, 0);
        if (index > -1) {
          this.products.splice(index, 1, "normal");
          this.storage.set("products", (this.products));
        }
      }
    */
    }

    

}
