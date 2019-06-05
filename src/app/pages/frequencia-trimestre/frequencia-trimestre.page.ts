import { FrequenciaDTO } from "../../models/frequencia.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { FrequenciaServiceProvider } from "src/app/services/frequencia.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-frequencia-trimestre",
  templateUrl: "frequencia-trimestre.page.html",
  styleUrls: ["./frequencia-trimestre.page.scss"]
})
export class FrequenciaTrimestrePage implements OnInit {
  freq: FrequenciaDTO;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private freqService: FrequenciaServiceProvider,
    private alertController: AlertController
  ) {
    this.freq = this.dataProvider.storage.freq;
  }

  async ngOnInit() {}

  async openFrequenciaDetailsPage(trimestre) {
    let aulas = this.freqService.getAulasByTrimestre(
      this.freq.listFreq,
      trimestre
    );
    if (aulas.length > 0) {
      this.dataProvider.storage = { trimestre: trimestre, aulas: aulas };
      this.router.navigate(["frequencia-details"]);
    } else {
      const alert = await this.alertController.create({
        header: "Não existem frequências lançadas para o período selecionado.",
        message: "Por favor entre em contato com a EMEB para mais informações.",
        buttons: [
          {
            text: "Ok"
          }
        ]
      });

      await alert.present();
    }
  }
}
