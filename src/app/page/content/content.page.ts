import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  public data: Array<any> = [];
  public apiURL = 'http://localhost:3000/';
  public cat: any;
  public catId: string;
  public catSearch = '';

  constructor(
    public auth: AngularFireAuth,
    private menuCtrl: MenuController,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public route: Router
  ) {

    this.catId = this.activatedRoute.snapshot.paramMap.get('cat');

    if (this.catId !== '0') this.catSearch = `?categoria=${this.catId}`;

  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {

    // Obtem todos os documentos da API
    this.http.get(
      this.apiURL
      + `projetos${this.catSearch}`)
      .subscribe(
        (res: any) => {

          res.forEach(element => {
            this.http.get(`${this.apiURL}categorias?id=${element.categoria}`).subscribe(
              (dtc: any) => {
                element.categoria = dtc[0].nome;
                this.data.push(element);
              }
            );
          });
        }
      );

    // Obtém todas as categorias
    this.http.get(
      this.apiURL
      + `categorias`)
      .subscribe(
        (res: any) => {

          // Prepara dados para a view (HTML)
          this.cat = res;
        }
      );
  }
  open(url) {
    window.open(url);
    return false;
  }

  changeCat(treco) {
    this.route.navigate([`/content/${treco.detail.value}`]);
  }

}


