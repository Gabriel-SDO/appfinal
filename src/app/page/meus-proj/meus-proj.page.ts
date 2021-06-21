import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meus-proj',
  templateUrl: './meus-proj.page.html',
  styleUrls: ['./meus-proj.page.scss'],
})
export class MeusProjPage implements OnInit {
  public data: Array<any> = [];
  public apiURL = 'http://localhost:3000/';
  public cat: any;
  public user: any;
  public html: string;

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  async ionViewWillEnter() {

    this.auth.onAuthStateChanged(
      (userData) => {
        this.user = userData;
        console.log(this.apiURL + `projetos?uid=${this.user.uid}`);

        // Obtem todos os documentos da API
        this.http.get(this.apiURL + `projetos?uid=${this.user.uid}`).subscribe(
          (res: any) => {

            this.html = `

              <ion-card class="ion-no-margin ion-margin-vertical">
              <ion-card-header>
                <ion-card-title class="ion-text-center">${res[0].title}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <h1 class="ion-text-center"> ${res[0].slogan}</h1>
                <ion-card-subtitle class="ion-text-center"> ${res[0].categoria}</ion-card-subtitle>
                <p class="ion-text-center">${res[0].description}</p>
                <h2 class="ion-text-center"><strong>
                  <ion-icon name="chatbubbles-outline"></ion-icon>
                  Entre em contato com o(s) autor(es)
                </strong></h2>
                <h3 class="ion-text-center email">
                  <ion-icon name="mail-outline"></ion-icon> ${res[0].email}
                </h3>
                <h3 class="ion-text-center tel">
                  <ion-icon name="call-outline"></ion-icon> ${res[0].tel}
                </h3>

                <ion-button onClick="location.href='/delete/${res[0].id}'" expand="block">Apagar</ion-button>
        
              </ion-card-content>
            </ion-card>              
              
              `;

            document.getElementById('ioncard').innerHTML = this.html;

          }
        );
      });

  }
}