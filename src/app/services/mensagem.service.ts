import { environment } from '../../environments/environment';
import { MensagemDTO } from '../models/mensagem.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensagemServiceProvider {

  constructor(public http: HttpClient) { }

  findMensagemByUsuario(idUsuario: string): Observable<MensagemDTO[]> {
    return this.http.get<MensagemDTO[]>(`${environment.api}/usuario/msg/${idUsuario}`);
  }

}
