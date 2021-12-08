import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MeusAlarmesPage } from '../meus-alarmes/meus-alarmes.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-alarme',
  templateUrl: './alarme.page.html',
  styleUrls: ['./alarme.page.scss'],
})
export class AlarmePage {

  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public nomeMedicamento: string;
  public intervaloH: number;
  public api;
  public switch = false;
  public quantidade_pilulas = 0;


  constructor(private httpClient: HttpClient, private localNotifications: LocalNotifications, public MeusAlarmesPage:MeusAlarmesPage) {
  }

  async notificarLembrete() {

    this.adicionarRemedio();

    const milissegundo = this.intervaloH * 60000;

    this.localNotifications.schedule({
      text: 'Hora de tomar seu remédio: ' + this.nomeMedicamento,
      title: 'Dr.Lembrete',
      trigger: { at: new Date(new Date().getTime() + milissegundo) },
      led: 'FF0000',
      sound: 'file://resources/audio/beep.mp3'
    });

  }


  adicionarRemedio() {

    if (this.switch == true) {
      this.quantidade_pilulas = 0;
    }

    let remedio = {
      nomeMedicamento: this.nomeMedicamento.toUpperCase(),
      intervaloH: this.intervaloH,
      qntdPilula: this.quantidade_pilulas,
      liquido: this.switch
    };


    this.httpClient.post(`http://localhost:4000/novoMedicamento/`, remedio).subscribe(
      resultado => {
        alert(resultado);
      },
      erro => {
        console.log(erro);
      }
    );
  }


}

