import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscaPostoPageRoutingModule } from './busca-posto-routing.module';

import { BuscaPostoPage } from './busca-posto.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscaPostoPageRoutingModule
  ],
  declarations: [BuscaPostoPage],
  providers: [Geolocation]

})
export class BuscaPostoPageModule {}
