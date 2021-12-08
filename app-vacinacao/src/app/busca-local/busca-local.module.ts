import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscaLocalPageRoutingModule } from './busca-local-routing.module';

import { BuscaLocalPage } from './busca-local.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscaLocalPageRoutingModule
  ],
  declarations: [BuscaLocalPage],
  providers: [Geolocation]

})
export class BuscaLocalPageModule { }
