import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { IonicModule } from '@ionic/angular';
import { ExibirCadastroPageRoutingModule } from './exibir-cadastro-routing.module';

import { ExibirCadastroPage } from './exibir-cadastro.page';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ExibirCadastroPageRoutingModule
  ],
  declarations: [ExibirCadastroPage]
})
export class ExibirCadastroPageModule {}
