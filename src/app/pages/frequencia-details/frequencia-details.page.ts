import { FrequenciaAulaDTO } from "../../models/frequencia-aula.dto";
import { Functions } from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-frequencia-details",
  templateUrl: "frequencia-details.page.html",
  styleUrls: ["./frequencia-details.page.scss"]
})
export class FrequenciaDetailsPage implements OnInit {
  aulas: FrequenciaAulaDTO[];
  trimestre;
  functions: Functions = new Functions();

  constructor(private dataProvider: DataProvider) {
    this.trimestre = this.dataProvider.storage.trimestre;
    this.aulas = this.dataProvider.storage.aulas;
  }

  async ngOnInit() {}
}
