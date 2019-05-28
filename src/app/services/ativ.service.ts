import { AtividadeAvaliativaDTO } from '../models/ativ.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtivServiceProvider {

  constructor(public http: HttpClient) { }

  findByTurmAlunIdTrimestre(idTurmAlun: string, trimestre: string = ''): Observable<AtividadeAvaliativaDTO[]> {
    return this.http.get<AtividadeAvaliativaDTO[]>(`${environment.api}/aluno/ativ/${idTurmAlun}/${trimestre}`);
  }

}
