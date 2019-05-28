import { Component, OnInit } from "@angular/core";
import { TempoDTO } from "../../models/tempo.dto";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-grade-horaria-details",
  templateUrl: "grade-horaria-details.page.html",
  styleUrls: ["./grade-horaria-details.page.scss"]
})
export class GradeHorariaDetailsPage implements OnInit {
  tempos: TempoDTO[];
  diaSemana;

  constructor(private dataProvider: DataProvider) {
    this.tempos = this.dataProvider.storage.tempos;
    this.diaSemana = this.dataProvider.storage.diaSemana;
  }

  ngOnInit() {}
}
