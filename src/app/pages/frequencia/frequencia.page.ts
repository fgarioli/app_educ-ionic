import { FrequenciaDTO } from "../../models/frequencia.dto";
import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { FrequenciaServiceProvider } from "src/app/services/frequencia.service";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";

@Component({
  selector: "app-frequencia",
  templateUrl: "frequencia.page.html",
  styleUrls: ["./frequencia.page.scss"]
})
export class FrequenciaPage implements OnInit {
  freqList: FrequenciaDTO[];

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private alertController: AlertController,
    private freqService: FrequenciaServiceProvider,
    private loadindCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = await this.loadindCtrl.create({
      message: "Carregando..."
    });
    await loading.present();
    let codTurmAlun = this.dataProvider.storage.codTurmAlun;
    let res = await this.freqService
      .findFreqByTurmAlunIdTrimestre(codTurmAlun)
      .toPromise();
    await loading.dismiss();

    if (res && res.length > 0) {
      this.freqList = res;
    } else {
      const alert = await this.alertController.create({
        header: "Nenhum registro de frequência encontrado.",
        message: "Por favor entre em contato com a EMEB para mais informações.",
        buttons: [
          {
            text: "Ok",
            handler: () => {
              this.router.navigate(["aluno"]);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  openFrequenciaTrimestrePage(freq: FrequenciaDTO) {
    this.dataProvider.storage = { freq };
    this.router.navigate(["frequencia-trimestre"]);
  }
}
