import { FrequenciaDTO } from "../models/frequencia.dto";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DisciplinaDTO } from "../models/disciplina.dto";

@Injectable({
  providedIn: "root"
})
export class ClassServiceProvider {
  constructor(public http: HttpClient) {}

  classify(
    idTurmAlun: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/aluno/classify/${idTurmAlun}`
    );
  }
}
