
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-exibir-cadastro',
  templateUrl: './exibir-cadastro.page.html',
  styleUrls: ['./exibir-cadastro.page.scss'],
})
export class ExibirCadastroPage {
  public rota: ActivatedRoute;
  public id: number;
  
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public api;
  public listaCadastro = [];
  public idCadastro; 



  constructor(public BrowserModule:BrowserModule, route: ActivatedRoute, private httpClient: HttpClient,public alertController:AlertController) {
    this.rota = route;
    this.listarCadastro();

   }


  
  async listarCadastro() {

   
    //Fazendo uma requisição do body da nossa API criada
    this.httpClient.get('http://localhost:4000/listarcadastro').subscribe((response) => {
      //Passando o body (a api) para uma variável
      this.api = response;
      //Passando para a variável, a quantidade de elementos dentro da API
      let qntdApi = Object.keys(this.api).length;

      for (let i = 0; i < qntdApi; i++) {
        this.listaCadastro[i] = this.api[i]
      }

      this.listaCadastro.forEach(element => {
        console.log(element)

      });

         })


  }





  async delete(id:number) {

    this.httpClient.delete('http://localhost:4000/delete/cadastro/:id)').subscribe(
      resultado => {
        console.log(resultado);
      },
      erro => {
        console.log(erro);
      })


  }


  async editar() {
    this.httpClient.put('http://localhost:4000/atualizar/cadastro/:id', this.id).subscribe(
      resultado => {
        console.log(resultado);
      },
      erro => {
        console.log(erro);
      }



    );
  }





}
