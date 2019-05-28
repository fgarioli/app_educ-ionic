import { GradeHorariaDTO } from '../models/grade-horaria.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TempoDTO } from '../models/tempo.dto';

@Injectable({
  providedIn: 'root',
})
export class GradeHorariaServiceProvider {

  constructor(public http: HttpClient) { }

  findByTurmAlun(idTurmAlun: string): Observable<GradeHorariaDTO> {
    return this.http.get<GradeHorariaDTO>(`${environment.api}/aluno/grade/${idTurmAlun}`);
  }

  findByDiaSemana(gradeHoraria: GradeHorariaDTO, diaSemana): TempoDTO[] {
    let temposDia = new Array();
    for (let tempo of gradeHoraria.tempos) {
      if (tempo.diaSemana == diaSemana) {
        temposDia.push(tempo);
      }
    }
    return temposDia;
  }

}
