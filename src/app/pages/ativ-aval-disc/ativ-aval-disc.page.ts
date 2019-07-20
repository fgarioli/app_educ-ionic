import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { AtivServiceProvider } from "src/app/services/ativ.service";

@Component({
  selector: "app-ativ-aval-disc",
  templateUrl: "ativ-aval-disc.page.html",
  styleUrls: ["./ativ-aval-disc.page.scss"]
})
export class AtivAvalDiscPage implements OnInit {
  listAtiv: AtividadeAvaliativaDTO[];
  listDisc;
  functions: Functions = new Functions();

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private ativService: AtivServiceProvider,
    private alertController: AlertController,
    private loadindCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = await this.loadindCtrl.create({
      message: "Carregando..."
    });
    await loading.present();
    let codTurmAlun = this.dataProvider.storage.codTurmAlun;
    let res = await this.ativService
      .findByTurmAlunIdTrimestre(codTurmAlun)
      .toPromise();
    await loading.dismiss();

    if (res && res.length > 0) {
      this.listAtiv = res;
      this.listDisc = this.ativService.getListDisc(this.listAtiv);
    } else {
      const alert = await this.alertController.create({
        header: "Nenhuma atividade encontrada.",
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

  openAtivAvalPage(disc) {
    let ativs = this.ativService.getAtivByDisc(this.listAtiv, disc);
    this.dataProvider.storage = { ativs, disc };
    this.router.navigate(["ativ-aval"]);
  }
}
