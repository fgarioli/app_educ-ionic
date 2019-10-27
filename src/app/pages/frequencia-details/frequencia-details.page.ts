import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { DisciplinaDTO } from "src/app/models/disciplina.dto";
import { FrequenciaServiceProvider } from "src/app/services/frequencia.service";
import { FrequenciaDTO } from "src/app/models/frequencia.dto";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-frequencia-details",
  templateUrl: "frequencia-details.page.html",
  styleUrls: ["./frequencia-details.page.scss"]
})
export class FrequenciaDetailsPage implements OnInit {
  disc: DisciplinaDTO;
  listFreq: FrequenciaDTO[] = [];
  trimestre: number;
  idTurmAlun: number;
  pageNumber: number = 0;
  last: boolean = false;
  totalFaltas: number = 0;
  private functions: Functions = new Functions();

  constructor(
    private dataProvider: DataProvider,
    private freqService: FrequenciaServiceProvider,
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
      this.totalFaltas = await this.freqService
        .getFaltasByTrimetreDisciplina(
          this.idTurmAlun,
          this.trimestre,
          this.disc.id
        )
        .toPromise();

      let res = await this.freqService
        .getListFrequencia(
          this.idTurmAlun,
          this.trimestre,
          this.disc.id,
          this.pageNumber
        )
        .toPromise();
      await loading.dismiss();

      this.listFreq = res.content;
      this.pageNumber = res.pageable.pageNumber + 1;
      this.last = res.last;
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }

  async loadData(event) {
    let res = await this.freqService
      .getListFrequencia(
        this.idTurmAlun,
        this.trimestre,
        this.disc.id,
        this.pageNumber
      )
      .toPromise();

    if (!this.last) {
      this.listFreq = this.listFreq.concat(res.content);
      this.pageNumber = res.pageable.pageNumber + 1;
      this.last = res.last;
    }

    event.target.complete();
  }
}
