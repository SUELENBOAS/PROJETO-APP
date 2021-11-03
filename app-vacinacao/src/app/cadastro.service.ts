import { Injectable } from '@angular/core';
import iCadastro from './Interface/icadastro';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  public usuario: iCadastro[] = [];

  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage;
    this.storage.create().then(() => console.log('Armazenamento criado'));
    this.storage.get('contatos')
      .then(contatos => this.usuario.push(...contatos))
      .catch(() => this.storage.set('contatos', this.usuario));
  }

  buscarDados(): iCadastro[] {
    return this.usuario;
  }

  buscarDados2():Observable<any[]> {
    return of(this.usuario);
  }

  buscarUsuarioPorId(nome) {
    let user;
    
    this.usuario.forEach(
      (u)=>{
        if(u.nome==nome){
          console.log(u)
        user = u;
       } 
      });
      
      return user;
  } 

  salvar(pessoa: iCadastro): void {
    pessoa.id = this.usuario.length + 1;
    this.usuario.push(pessoa);
    this.storage.set('contatos', this.usuario);

  }

  deletar(indice: number): void {
    this.usuario.splice(indice - 1, 1);
    this.atualizarIds();
    this.storage.set('contatos', this.usuario);

  }


  atualizarIds(): void {
    this.usuario.forEach(pessoa => pessoa.id = this.usuario.indexOf(pessoa) + 1);

  }

}
