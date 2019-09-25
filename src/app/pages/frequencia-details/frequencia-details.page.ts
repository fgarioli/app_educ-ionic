import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { FrequenciaDTO } from "src/app/models/frequencia.dto";

@Component({
  selector: "app-frequencia-details",
  templateUrl: "frequencia-details.page.html",
  styleUrls: ["./frequencia-details.page.scss"]
})
export class FrequenciaDetailsPage implements OnInit {
  freq: FrequenciaDTO[];
  trimestre: number;
  private functions: Functions = new Functions();

  constructor(private dataProvider: DataProvider) {
    this.trimestre = this.dataProvider.storage.trimestre;
    this.freq = this.dataProvider.storage.freq;
  }

  async ngOnInit() {}
}
