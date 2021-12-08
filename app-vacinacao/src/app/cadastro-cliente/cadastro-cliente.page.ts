import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroCliente {

  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public api;
  public listacadastro = [];
  public nome: string;
  public email: string;
  public senha: string;
  public contato: number;
  public emergencia: number;
  public cidade: string;
  public cep: number;
  public logradouro: string;
  public uf: string;
  public numero: number;
  public bairro: string;
  public alergias: string;
  public peso: number;
  public altura: number;
  public dataNasc: Date;
  public tpsanguinio: number;
  public genero: string;

  constructor(private httpClient: HttpClient, private route: Router) {
  }


  adicionarcadastro() {


    let cadastro = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      contato: this.contato,
      emergencia: this.emergencia,
      cidade: this.cidade,
      cep: this.cep,
      logradouro: this.logradouro,
      uf: this.uf,
      numero: this.numero,
      bairro: this.bairro,
      alergias: this.alergias,
      altura: this.altura,
      dataNasc: this.dataNasc,
      tpsanguinio: this.tpsanguinio,
      genero: this.genero,

    };


    this.httpClient.post(`http://localhost:4000/novocadastro/`, cadastro).subscribe(
      resultado => {
        console.log(resultado);
      },
      erro => {
        console.log(erro);
      }


    );




  }


  
}

