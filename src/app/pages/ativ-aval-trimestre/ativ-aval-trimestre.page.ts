import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { AtivServiceProvider } from "src/app/services/ativ.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-ativ-aval-trimestre",
  templateUrl: "ativ-aval-trimestre.page.html",
  styleUrls: ["./ativ-aval-trimestre.page.scss"]
})
export class AtivAvalTrimestrePage implements OnInit {
  anoLetivo = environment.ano;
  idTurmAlun: number;

  constructor(private dataProvider: DataProvider, private router: Router) {
    this.idTurmAlun = this.dataProvider.storage.codTurmAlun;
  }

  async ngOnInit() {}

  async openAtivTrimDiscPage(trimestre: number) {
    this.dataProvider.storage = { trimestre, idTurmAlun: this.idTurmAlun };
    this.router.navigate(["ativ-aval-trimestre-disciplina"]);
  }
}
