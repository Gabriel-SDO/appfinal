import { Component, OnInit } from '@angular/core';

// Importa dependências
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

// Validação (filtro) personalizado
// Não permite compos somente com espaços
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

//
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  // Atributos
  public apiURL = 'http://localhost:3000/';
  public newForm: FormGroup;
  public pipe = new DatePipe('en_US');
  public cat: any;



  constructor(

    // Injeta dependências
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router,
    public alert: AlertController,
    public form: FormBuilder,
    public auth: AngularFireAuth
  ) {

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


    this.auth.onAuthStateChanged(
      (uData) => {
        if (!uData.uid) this.router.navigate(['/home']);
        this.newForm.controls.uid.setValue(uData.uid);
      }
    );

    // Cria os campos do formulário
    this.newFormCreate();
  }

  ngOnInit() { }

  // Cria os campos do formulário
  newFormCreate() {

    this.newForm = this.form.group({


      // Status do contato (status)
      status: ['true'],

      // Nome do projeto (name)
      title: [                      // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      // Slogan do projeto(slogan)
      slogan: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces
        ])
      ],


      // Descrição do projeto (description)
      description: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(5),  // Deve ter pelo menos 5 caracteres
          removeSpaces              // Remove espaços duplicados
        ])
      ],

      categoria: [''],

      // email do projeto(email)
      email: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces
        ])
      ],

      // Telegone do projeto(tel)
      tel: [                    // Nome do campo
        '',                         // Valor inicial do campo
        Validators.compose([        // Valida o campo
          Validators.required,      // Campo é obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces
        ])
      ],

      // Id do proprietário
      'uid': ['']
    });
  };


  // Salva novo documento no banco de dados
  newSend() {

    this.http.post(this.apiURL + `projetos`, this.newForm.value).subscribe(
      (data: any) => {

        // Feedback
        this.feedback(this.newForm.controls.title.value);
      }
    );

  }

  // Popup de feedback
  async feedback(title: string) {

    const alert = await this.alert.create({
      header: `Oba!`,
      message: `O seu projeto foi cadastrado com sucesso.`,
      buttons: [

        // Botão [Ok]
        {
          text: 'Ok',
          handler: () => {

            // Reset do formulário
            this.newForm.reset();

            // Retorna para a home
            this.router.navigate(['/content/0']);
          }
        }
      ]
    });

    await alert.present();
  }
}
