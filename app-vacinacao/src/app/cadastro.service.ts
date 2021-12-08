import { Injectable } from '@angular/core';
import iCadastro from './Interface/icadastro';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public dados;
  public api;
  public nome: string;
  public id: number;
  public cadastro: iCadastro[];

  getcadastro() {
    this.httpClient.get('http://localhost:4000/cadastro/').subscribe((response) => {
      
      this.api = response;

      for (let i = 1; i <= Object.keys(this.api).length; i++) {
        this.id = this.api[i].id;
        this.nome = this.api[i].nome;
        
        this.cadastro[i] = 
          {id:this.api[i].id, nome: this.api[i].nome,email : this.api[i].email,senha: this.api[i].senha,contato: this.api[i].contato,
            emergencia: this.api[i].emergencia,cidade: this.api[i].cidade,cep: this.api[i].cep,logradouro: this.api[i].logradouro,
             uf: this.api[i].uf,numero: this.api[i].numero,bairro: this.api[i].bairro,alergias: this.api[i].alergias, peso : this.api[i].peso,
             altura: this.api[i].altura,dataNasc : this.api[i].dataNasc,tpsanguinio : this.api[i].tpsanguinio, genero: this.api[i].genero }

          }
            })
  }

  constructor(private httpClient: HttpClient) {
    
  }

  buscarcadastro(): iCadastro[] {
    return this.cadastro;
  }

  }
