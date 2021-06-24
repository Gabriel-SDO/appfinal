import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Conteúdo', url: '/content/0', icon: 'newspaper' },
    { title: 'Faça contato', url: '/contacts', icon: 'chatbubbles' },
    { title: 'Sobre', url: '/about', icon: 'information-circle' },
    { title: 'Meus projetos', url: '/projetos', icon: 'document-text'},
    { title: 'Cadastrar Projetos', url: '/new', icon: 'add-circle'}
  ];

  constructor(
    public auth: AngularFireAuth
  ) { }
}
