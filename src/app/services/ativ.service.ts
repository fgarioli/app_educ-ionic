import { AtividadeAvaliativaDTO } from "../models/ativ.dto";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AtivServiceProvider {
  constructor(public http: HttpClient) {}

  findByTurmAlunIdTrimestre(
    idTurmAlun: string,
    trimestre: string = ""
  ): Observable<AtividadeAvaliativaDTO[]> {
    return this.http.get<AtividadeAvaliativaDTO[]>(
      `${environment.api}/aluno/ativ/${idTurmAlun}/${trimestre}`
    );
  }

  /**
   * Retorna uma lista de disciplinas a partir de uma lista de Atividades Avaliativas
   * @param list
   */
  getListDisc(list: AtividadeAvaliativaDTO[]) {
    let listDisc = [];
    list.forEach(at => {
      if (!listDisc.includes(at.disciplina)) {
        listDisc.push(at.disciplina);
      }
    });

    return listDisc;
  }

  /**
   * Retorna uma lista de atividades avaliativas por disciplina
   * @param list 
   * @param disc 
   */
  getAtivByDisc(
    list: AtividadeAvaliativaDTO[],
    disc
  ): AtividadeAvaliativaDTO[] {
    let listAtiv = [];
    list.forEach(at => {
      if (at.disciplina == disc) {
        listAtiv.push(at);
      }
    });

    return listAtiv;
  }
}
