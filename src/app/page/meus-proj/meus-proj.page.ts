import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  public html = '';
  public id: string;
  public catNome: string;

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public route: Router
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  async ionViewWillEnter() {

    this.auth.onAuthStateChanged(
      (userData) => {
        this.user = userData;

        if (!this.user.uid) this.route.navigate(['/home']);

        // Obtem todos os documentos da API
        this.http.get(this.apiURL + `projetos?uid=${this.user.uid}`).subscribe(
          (res: any) => {


            res.forEach(data => {



              this.http.get(`${this.apiURL}categorias?id=${data.categoria}`).subscribe(
                (dtc: any) => {

                  this.catNome = dtc[0].nome;

                  this.html = `

                  <ion-card class="ion-no-margin ion-margin-vertical">
                  <ion-card-header>
                    <ion-card-title class="ion-text-center">${data.title}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <h1 class="ion-text-center"> ${data.slogan}</h1>
                    <ion-card-subtitle class="ion-text-center" > ${this.catNome}</ion-card-subtitle>
                    <p class="ion-text-center">${data.description}</p>
                    <h2 class="ion-text-center"><strong>
                      <ion-icon name="chatbubbles-outline"></ion-icon>
                      Entre em contato com o(s) autor(es)
                    </strong></h2>
                    <h3 class="ion-text-center email">
                      <ion-icon name="mail-outline"></ion-icon> ${data.email}
                    </h3>
                    <h3 class="ion-text-center tel">
                      <ion-icon name="call-outline"></ion-icon> ${data.tel}
                    </h3>
    
                    <ion-button onClick="location.href='/delete/${data.id}'" expand="block" color="danger">Apagar</ion-button>
            
                  </ion-card-content>
                </ion-card>              
                  
                  `;

                  document.getElementById('ioncard').innerHTML = document.getElementById('ioncard').innerHTML + this.html;

                });
            });
          }
        );
      });

  }
}

