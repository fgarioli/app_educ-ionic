import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { TurmAlunDTO } from "../models/turmalun.dto";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TurmalunServiceProvider {
  constructor(private http: HttpClient) {}

  findByAluno(codAlun: String, ano: String): Observable<TurmAlunDTO> {
    return this.http.get<TurmAlunDTO>(
      `${environment.api}/aluno/alun/${codAlun}/${ano}`
    );
  }

  findByResponsavel(codResp: String, ano: String): Observable<TurmAlunDTO[]> {
    return this.http.get<TurmAlunDTO[]>(
      `${environment.api}/resp/${codResp}/${ano}`
    );
  }

  findByPessIdAno(pessId: String, ano: String): Observable<TurmAlunDTO[]> {
    return this.http.get<TurmAlunDTO[]>(
      `${environment.api}/aluno/${pessId}/${ano}`
    );
  }
}
