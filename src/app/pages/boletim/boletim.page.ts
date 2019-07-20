import { BoletimDTO } from "../../models/boletim.dto";
import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { BoletimServiceProvider } from "src/app/services/boletim.service";

@Component({
  selector: "app-boletim",
  templateUrl: "boletim.page.html",
  styleUrls: ["./boletim.page.scss"]
})
export class BoletimPage implements OnInit {
  boletim: BoletimDTO[];

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

  openBoletimDetailsPage(boletim: BoletimDTO) {
    this.dataProvider.storage = { boletim };
    this.router.navigate(["boletim-details"]);
  }
}
