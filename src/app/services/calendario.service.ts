import { environment } from '../../environments/environment';
import { CalendarioDTO } from '../models/calendario.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalendarioServiceProvider {

  constructor(public http: HttpClient) { }

  findCalendarioByAno(ano: string): Observable<CalendarioDTO[]> {
    return this.http.get<CalendarioDTO[]>(`${environment.api}/cale/${ano}`);
  }

}
