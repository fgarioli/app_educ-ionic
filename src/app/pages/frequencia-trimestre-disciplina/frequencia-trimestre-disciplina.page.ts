import { FrequenciaDTO } from "../../models/frequencia.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-frequencia-trimestre-disciplina",
  templateUrl: "frequencia-trimestre-disciplina.page.html",
  styleUrls: ["./frequencia-trimestre-disciplina.page.scss"]
})
export class FrequenciaTrimestreDisciplinaPage implements OnInit {
  totalAulas: number = 0;
  totalFaltas: number = 0;
  anoLetivo = environment.ano;
  listDisc: string[] = [];
  listFreq: FrequenciaDTO[] = [];
  trimestre: number;

  constructor(private dataProvider: DataProvider, private router: Router) {
    this.listFreq = this.dataProvider.storage.listFreq;
    this.trimestre = this.dataProvider.storage.trimestre;

    this.listFreq.forEach(freq => {
      freq.listFreq.forEach(value => {
        if (value.presenca) {
          this.totalAulas++;
        } else {
          this.totalFaltas++;
        }
      });
    });
  }

  async ngOnInit() {}

  async openDiscDetailPage(freq: FrequenciaDTO) {
    this.dataProvider.storage = { freq, trimestre: this.trimestre };
    this.router.navigate(["frequencia-details"]);
  }
}
