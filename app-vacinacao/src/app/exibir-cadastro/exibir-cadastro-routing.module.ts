import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExibirCadastroPage } from './exibir-cadastro.page';


const routes: Routes = [
  {
    path: '',
    component: ExibirCadastroPage,
   
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExibirCadastroPageRoutingModule {}
