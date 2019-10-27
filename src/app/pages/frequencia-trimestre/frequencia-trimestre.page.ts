import { FrequenciaDTO } from "../../models/frequencia.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-frequencia-trimestre",
  templateUrl: "frequencia-trimestre.page.html",
  styleUrls: ["./frequencia-trimestre.page.scss"]
})
export class FrequenciaTrimestrePage implements OnInit {
  totalAulas: number = 0;
  totalFaltas: number = 0;
  anoLetivo = environment.ano;
  idTurmAlun: number;

  constructor(private dataProvider: DataProvider, private router: Router) {
    this.idTurmAlun = this.dataProvider.storage.codTurmAlun;
  }

  async ngOnInit() {}

  async openFreqTrimDiscPage(trimestre: number) {
    this.dataProvider.storage = { trimestre, idTurmAlun: this.idTurmAlun };
    this.router.navigate(["frequencia-trimestre-disciplina"]);
  }
}
