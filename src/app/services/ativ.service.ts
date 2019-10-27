import { AtividadeAvaliativaDTO } from "../models/ativ.dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { DisciplinaDTO } from "../models/disciplina.dto";

@Injectable({
  providedIn: "root"
})
export class AtivServiceProvider {
  constructor(public http: HttpClient) {}

  findByTurmAlunIdTrimestre(
    idTurmAlun: number,
    trimestre: number,
    discId: number
  ): Observable<AtividadeAvaliativaDTO[]> {
    return this.http.get<AtividadeAvaliativaDTO[]>(
      `${environment.api}/ativ/${idTurmAlun}/${trimestre}/${discId}`
    );
  }

  getListDisciplina(
    idTurmAlun: number,
    trimestre: number
  ): Observable<DisciplinaDTO[]> {
    return this.http.get<DisciplinaDTO[]>(
      `${environment.api}/ativ/${idTurmAlun}/${trimestre}`
    );
  }
}
