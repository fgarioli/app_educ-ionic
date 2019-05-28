import { FrequenciaAulaDTO } from '../models/frequencia-aula.dto';
import { FrequenciaDTO } from '../models/frequencia.dto';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrequenciaServiceProvider {

  constructor(public http: HttpClient) { }

  findFreqByTurmAlunIdTrimestre(idTurmAlun: string, trimestre: string = ''): Observable<FrequenciaDTO[]> {
    return this.http.get<FrequenciaDTO[]>(`${environment.api}/aluno/freq/${idTurmAlun}/${trimestre}`);
  }

  getAulasByTrimestre(freqAula: FrequenciaAulaDTO[], trimestre): FrequenciaAulaDTO[] {
    let listFreq = new Array();
    console.log(freqAula);
    for(let aula of freqAula) {
      if (aula.periodo == trimestre) {
        listFreq.push(aula);
      }
    }

    return listFreq;
  }

}
