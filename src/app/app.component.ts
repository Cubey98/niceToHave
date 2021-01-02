import { async } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, ModalController, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: PlatformLocation,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.initializeApp();

    this.platform.backButton.subscribeWithPriority(0, async() => {

      // temprarily logic! remove if the real logic works!
      window.history.back();

      // TODO: this logic is not working, fix it later!

      /*
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === "/home") {
        const alert = await this.alertController.create({
          header: "App Schließen?",
          message: "Willst du die App wirklich schließen?",
          buttons: [
            {
              text: "Abbrechen",
              role: "cancel"
            },
            {
              text: "Ja",
              handler: () => {
                navigator["app"].exitApp();
              }
            }
          ]
        })
      }*/

    });

    this.location.onPopState(async () => {
      console.log("ON POP");
      const modal = await this.modalController.getTop();
      if (modal) {
        modal.dismiss();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
