import Functions from "../../utils/functions.utils";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { DisciplinaDTO } from "src/app/models/disciplina.dto";
import { AtivServiceProvider } from "src/app/services/ativ.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-ativ-aval-details",
  templateUrl: "ativ-aval-details.page.html",
  styleUrls: ["./ativ-aval-details.page.scss"]
})
export class AtivAvalDetailsPage implements OnInit {
  disc: DisciplinaDTO;
  listAtiv: AtividadeAvaliativaDTO[] = [];
  trimestre: number;
  idTurmAlun: number;
  functions: Functions = new Functions();

  constructor(
    private dataProvider: DataProvider,
    private ativService: AtivServiceProvider,
    private loadingCtrl: LoadingController
  ) {
    this.trimestre = this.dataProvider.storage.trimestre;
    this.idTurmAlun = this.dataProvider.storage.idTurmAlun;
    this.disc = this.dataProvider.storage.disc;
  }

  async ngOnInit() {
    let loading = null;
    try {
      loading = await this.loadingCtrl.create({
        message: "Carregando..."
      });
      await loading.present();
      let res = await this.ativService
        .findByTurmAlunIdTrimestre(
          this.idTurmAlun,
          this.trimestre,
          this.disc.id
        )
        .toPromise();
      await loading.dismiss();

      this.listAtiv = res;
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }
}
