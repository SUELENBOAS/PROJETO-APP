
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import iCadastro from '../Interface/icadastro';
import { CadastroService } from '../cadastro.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exibir-cadastro',
    templateUrl: './exibir-cadastro.page.html',
    styleUrls: ['./exibir-cadastro.page.scss'],
  })
  export class ExibirCadastroPage implements OnInit {
    public rota: ActivatedRoute;
    public id: number;
    public dados: iCadastro[];
    public usuario: iCadastro;
  public servico: CadastroService;
  public options: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public api;
  public listacadastro = [];  
  public nome: string;
  public email:string;
  public senha:string;
  public contato: number;
  public emergencia:number;
  public cidade:string;
  public cep:number;
  public logradouro:string;
  public uf:string;
  public numero:number;
  public bairro:string;
  public alergias:string;
  public peso:number;
  public altura:number;
  public dataNasc:Date;
  public tpsanguinio:number;
  public genero:string;
  


  constructor(route: ActivatedRoute, dadosServico: CadastroService,private httpClient: HttpClient) {
    this.rota = route;
    this.servico = dadosServico;
    this.dados = this.servico.buscarcadastro();

   }

  
  ngOnInit() {
       this.id = Number(this.rota.snapshot.paramMap.get('id'));
     }


     
    async listarCadastro() {
      //Fazendo uma requisição do body da nossa API criada
      this.httpClient.get('http://localhost:4000/cadastro/').subscribe((response) => {
        //Passando o body (a api) para uma variável
        this.api = response;
        //Passando para a variável, a quantidade de elementos dentro da API
        let qntdApi = Object.keys(this.api).length;
  
        for (let i = 0; i < qntdApi; i++) {
          this.listacadastro[i] = this.api[i]
        }
        
        this.listacadastro.forEach(element => {
          console.log(element)
        });
  
      })
    }


   async delete(){

      this.httpClient.delete('http://localhost:4000/delete/cadastro/:id').subscribe(
      resultado => {
        console.log(resultado);
      },
      erro => {
        console.log(erro);
      })
    
    
}


async editar(){
  this.httpClient.put('http://localhost:4000/atualizar/cadastro/:id',this.id).subscribe(
    resultado => {
      console.log(resultado);
    },
    erro => {
      console.log(erro);
    }

 
  
  );
}





  }
