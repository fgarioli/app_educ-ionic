import { FrequenciaDTO } from "../../models/frequencia.dto";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
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
    private freqService: FrequenciaServiceProvider
  ) {}

  async ngOnInit() {
    let codTurmAlun = this.dataProvider.storage.codTurmAlun;
    let res = await this.freqService
      .findFreqByTurmAlunIdTrimestre(codTurmAlun)
      .toPromise();

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
