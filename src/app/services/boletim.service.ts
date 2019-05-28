import { environment } from '../../environments/environment';
import { BoletimDTO } from '../models/boletim.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoletimServiceProvider {

  constructor(public http: HttpClient) { }

  findBoletimByTurmAlunIdTrimestre(pessId: string, trimestre: string = ''): Observable<BoletimDTO[]> {
    return this.http.get<BoletimDTO[]>(`${environment.api}/aluno/boletim/${pessId}/${trimestre}`);
  }

}
