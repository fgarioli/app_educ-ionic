import { FrequenciaDTO } from "../../models/frequencia.dto";
import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { FrequenciaServiceProvider } from "src/app/services/frequencia.service";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-frequencia-trimestre",
  templateUrl: "frequencia-trimestre.page.html",
  styleUrls: ["./frequencia-trimestre.page.scss"]
})
export class FrequenciaTrimestrePage implements OnInit {
  freqList: FrequenciaDTO[];
  totalAulas: number = 0;
  totalFaltas: number = 0;
  anoLetivo = environment.ano;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private alertController: AlertController,
    private freqService: FrequenciaServiceProvider,
    private loadindCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = null;
    try {
      loading = await this.loadindCtrl.create({
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
        this.freqList.forEach(freq => {
          freq.listFreq.forEach(value => {
            if (value.presenca) {
              this.totalAulas++;
            } else {
              this.totalFaltas++;
            }
          });
        });
      } else {
        const alert = await this.alertController.create({
          header: "Nenhum registro de frequência encontrado.",
          message:
            "Por favor entre em contato com a EMEB para mais informações.",
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
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }

  async openFreqTrimDiscPage(trimestre: number) {
    let listTrim: FrequenciaDTO[] = [];
    this.freqList.forEach(freqDisc => {
      if (freqDisc.listFreq.length > 0) {
        let freq = {} as FrequenciaDTO;
        freq.listFreq = [];
        freq.disciplina = freqDisc.disciplina;

        for (let aula of freqDisc.listFreq) {
          if (aula.periodo == trimestre) {
            freq.listFreq.push(aula);
            if (aula.presenca) {
              freq.totalAulas++;
            } else {
              freq.totalFaltas++;
            }
          }
        }

        if (freq.listFreq.length > 0) {
          listTrim.push(freq);
        }
      }
    });

    if (listTrim.length > 0) {
      this.dataProvider.storage = { trimestre, listFreq: listTrim };
      this.router.navigate(["frequencia-trimestre-disciplina"]);
    } else {
      const alert = await this.alertController.create({
        header:
          "Nenhum registro de frequência encontrado para o trimestre selecionado.",
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
