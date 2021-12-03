import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExibirCadastroPage } from './exibir-cadastro.page';
import { ExibirCadastroResolver } from './exibir-cadastro.resolver';

const routes: Routes = [
  {
    path: '',
    component: ExibirCadastroPage,
    resolve: {
      usuarios: ExibirCadastroResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExibirCadastroPageRoutingModule {}
