import { BoletimDTO } from "../../models/boletim.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-boletim-trimestre-disciplina",
  templateUrl: "boletim-trimestre-disciplina.page.html",
  styleUrls: ["./boletim-trimestre-disciplina.page.scss"]
})
export class BoletimTrimestreDisciplinaPage implements OnInit {
  boletim: BoletimDTO[];
  trimestre: number;
  anoLetivo = environment.ano;

  constructor(private dataProvider: DataProvider) {
    this.boletim = this.dataProvider.storage.listNotas;
    this.trimestre = this.dataProvider.storage.trimestre;
  }

  async ngOnInit() {}
}
