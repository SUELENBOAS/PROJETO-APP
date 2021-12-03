import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../cadastro.service';
import iCadastro from '../Interface/icadastro';

// interface IUsuario {
// nome: string;}

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
})
export class CadastroClientePage implements OnInit, OnChanges {

  public dados: iCadastro[];

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
  public detalhes: string;
  public servico: CadastroService; 

  constructor(servico: CadastroService, private route:Router) {
    this.servico = servico;
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onchanges")
    console.log(this.servico.buscarUsuarioPorId('jhon'));
  }

  voltar(): void {
    this.route.navigate(['/exibir-cadastro/' + this.nome])
  }

  inserir(): void {
    this.servico.salvar({
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
    peso: this.peso,
    altura: this.altura,
    dataNasc: this. dataNasc,
    tpsanguinio: this.tpsanguinio,
    genero: this.genero,      
    });

    this.voltar();

    
  }

  

  ngOnInit() {
  }

//   public texto = usuario.name;

// public pessoa: IUsuario = {
//     nome: ' ',
    
//   }

public switch = true;

public input = '';



}


