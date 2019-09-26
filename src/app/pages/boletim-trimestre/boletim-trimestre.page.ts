import { BoletimDTO } from "../../models/boletim.dto";
import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { BoletimServiceProvider } from "src/app/services/boletim.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-boletim-trimestre",
  templateUrl: "boletim-trimestre.page.html",
  styleUrls: ["./boletim-trimestre.page.scss"]
})
export class BoletimTrimestrePage implements OnInit {
  boletim: BoletimDTO[];
  anoLetivo = environment.ano;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private boletimService: BoletimServiceProvider,
    private alertController: AlertController,
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
      let res = await this.boletimService
        .findBoletimByTurmAlunIdTrimestre(codTurmAlun)
        .toPromise();
      await loading.dismiss();

      if (res && res.length > 0) {
        this.boletim = res;
      } else {
        const alert = await this.alertController.create({
          header: "Nenhum registro de notas encontrado.",
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
      const alert = await this.alertController.create({
        header: error,
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

  async openBoletimTrimestreDiscPage(trimestre: number) {
    let listNotas: BoletimDTO[] = [];
    this.boletim.forEach(value => {
      if (value.periodo == trimestre) {
        listNotas.push(value);
      }
    });

    if (listNotas.length > 0) {
      this.dataProvider.storage = { listNotas, trimestre };
      this.router.navigate(["boletim-trimestre-disciplina"]);
    } else {
      const alert = await this.alertController.create({
        header:
          "Nenhum registro de nota encontrado para o trimestre selecionado.",
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
