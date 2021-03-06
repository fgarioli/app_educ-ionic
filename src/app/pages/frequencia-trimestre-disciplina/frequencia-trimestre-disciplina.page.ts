import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoadingController, AlertController } from "@ionic/angular";
import { FrequenciaServiceProvider } from "src/app/services/frequencia.service";
import { DisciplinaDTO } from "src/app/models/disciplina.dto";

@Component({
  selector: "app-frequencia-trimestre-disciplina",
  templateUrl: "frequencia-trimestre-disciplina.page.html",
  styleUrls: ["./frequencia-trimestre-disciplina.page.scss"]
})
export class FrequenciaTrimestreDisciplinaPage implements OnInit {
  totalAulas: number = 0;
  totalFaltas: number = 0;
  anoLetivo = environment.ano;
  listDisc: DisciplinaDTO[] = [];
  trimestre: number;
  idTurmAlun: number;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private freqService: FrequenciaServiceProvider
  ) {
    this.trimestre = this.dataProvider.storage.trimestre;
    this.idTurmAlun = this.dataProvider.storage.idTurmAlun;
  }

  async ngOnInit() {
    let loading = null;
    try {
      loading = await this.loadingCtrl.create({
        message: "Carregando..."
      });
      await loading.present();
      this.totalFaltas = await this.freqService
        .getFaltasByTrimetre(this.idTurmAlun, this.trimestre)
        .toPromise();

      let res = await this.freqService
        .getListDisciplina(this.idTurmAlun, this.trimestre)
        .toPromise();
      await loading.dismiss();
      if (res && res.length > 0) {
        this.listDisc = res;
      } else {
        const alert = await this.alertController.create({
          header: "Nenhuma frequência lançada em nenhuma disciplina.",
          message:
            "Por favor entre em contato com a EMEB para mais informações.",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.router.navigate(["frequencia-trimestre"]);
              }
            }
          ]
        });
        await alert.present();
      }
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }

  async openDiscDetailPage(disc: DisciplinaDTO) {
    this.dataProvider.storage = {
      disc,
      trimestre: this.trimestre,
      idTurmAlun: this.idTurmAlun
    };
    this.router.navigate(["frequencia-details"]);
  }
}
