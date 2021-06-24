import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuCtrl: MenuController,
    public navCtrl : NavController) { }

  ngOnInit() {
    // this.menuCtrl.enable(true);
    // this.menuCtrl.enable(false);
  }

  logar(){
    this.navCtrl.navigateRoot('/user/login');
  }

  entrar(){
    this.navCtrl.navigateRoot('/content/0');
  }
}
