import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusProjPage } from './meus-proj.page';

const routes: Routes = [
  {
    path: '',
    component: MeusProjPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusProjPageRoutingModule {}
