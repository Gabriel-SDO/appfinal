import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusProjPageRoutingModule } from './meus-proj-routing.module';

import { MeusProjPage } from './meus-proj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusProjPageRoutingModule
  ],
  declarations: [MeusProjPage]
})
export class MeusProjPageModule {}
