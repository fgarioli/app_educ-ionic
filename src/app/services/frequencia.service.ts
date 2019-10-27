import { FrequenciaDTO } from "../models/frequencia.dto";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DisciplinaDTO } from "../models/disciplina.dto";

@Injectable({
  providedIn: "root"
})
export class FrequenciaServiceProvider {
  constructor(public http: HttpClient) {}

  getListFrequencia(
    idTurmAlun: number,
    trimestre: number,
    discId: number,
    page: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/freq/${idTurmAlun}/${trimestre}/${discId}?page=${page}&size=6&sort=PAUTADATA,asc`
    );
  }

  getFaltasByTrimetreDisciplina(
    idTurmAlun: number,
    trimestre: number,
    discId: number
  ): Observable<number> {
    return this.http.get<number>(
      `${environment.api}/freq/${idTurmAlun}/${trimestre}/${discId}/total`
    );
  }

  getListDisciplina(
    idTurmAlun: number,
    trimestre: number
  ): Observable<DisciplinaDTO[]> {
    return this.http.get<DisciplinaDTO[]>(
      `${environment.api}/freq/${idTurmAlun}/${trimestre}`
    );
  }

  getFaltasByTrimetre(
    idTurmAlun: number,
    trimestre: number
  ): Observable<number> {
    return this.http.get<number>(
      `${environment.api}/freq/${idTurmAlun}/${trimestre}/total`
    );
  }
}
