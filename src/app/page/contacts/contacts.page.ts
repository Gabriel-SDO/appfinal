import { Component, OnInit } from '@angular/core';

// Importa dependências
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';

export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  public contactForm: FormGroup;        // Cria o formulário
  public pipe = new DatePipe('en_US');  // Formatador de datas
  public apiURL = 'http://localhost:8100/'; // URL da API

  constructor(

    public form: FormBuilder,
    public alert: AlertController,
    public http: HttpClient,
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {

    this.contactFormCreate();

    if (this.contactForm) {
      this.auth.onAuthStateChanged(
        (userData) => {
          if(userData) {
            this.contactForm.controls.name.setValue(userData.displayName.trim());
            this.contactForm.controls.email.setValue(userData.email.trim());
          }
        }
      );
    }
  }

  contactFormCreate() {

    this.contactForm = this.form.group({

      date: [''],

      status: ['Enviado'],

      name: [                       // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      email: [                      // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.email,         // Deve ser um e-mail válido
          removeSpaces              // Remove espaços duplicados
        ])
      ],
      subject: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      message: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ]
    });
  };

  contactSend() {

    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss')
    );

    this.http.post(this.apiURL + 'contacts', this.contactForm.value).subscribe(
      (res: any) => {
        if (res) {

          this.feedback();

        }
      }, (error: string) => {
        console.error(`Erro ao salvar na API: ${error}`);
      }
    );

    return false;
  }

  async feedback() {

    var name = this.contactForm.controls.name.value.split(' ');

    const alert = await this.alert.create({
      header: `Olá ${name[0]}!`,
      message: 'Seu contato foi enviado com sucesso para a equipe do aplicativo.',
      buttons: [

        {
          text: 'Ok',
          handler: () => {

            this.contactForm.reset({

              name: this.contactForm.controls.name.value,
              email: this.contactForm.controls.email.value,
              status: 'Enviado'
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
