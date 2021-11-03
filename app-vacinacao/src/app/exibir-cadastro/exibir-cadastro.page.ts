import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CadastroService } from '../cadastro.service';
import iCadastro from '../Interface/icadastro';
@Component({
  selector: 'app-exibir-cadastro',
  templateUrl: './exibir-cadastro.page.html',
  styleUrls: ['./exibir-cadastro.page.scss'],
})
export class ExibirCadastroPage implements OnInit, DoCheck {
  public id: string;
  public dados: iCadastro[];
  public usuario: iCadastro;
  
  constructor(private rota: ActivatedRoute) {
    this.dados = this.rota.snapshot.data['usuarios'];
  }

  ngOnInit() {
    this.id = this.rota.snapshot.paramMap.get('id');
  }

  ngDoCheck() {
    this.usuario = this.dados.find(u=> u.nome == this.id);
  }
}
