import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CadastroService } from '../cadastro.service';
import iCadastro from '../Interface/icadastro';

@Injectable({
    providedIn: 'root'
})
export class ExibirCadastroResolver implements Resolve<Observable<iCadastro[]>>{
    constructor(private service: CadastroService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<iCadastro[]>{
        const userName = route.params.id;
        return this.service.buscarDados2();
    }
}