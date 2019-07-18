import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { AtivServiceProvider } from "src/app/services/ativ.service";

@Component({
  selector: "app-ativ-aval",
  templateUrl: "ativ-aval.page.html",
  styleUrls: ["./ativ-aval.page.scss"]
})
export class AtivAvalPage implements OnInit {
  listAtiv: AtividadeAvaliativaDTO[];
  private functions: Functions = new Functions();

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private ativService: AtivServiceProvider,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    let codTurmAlun = this.dataProvider.storage.codTurmAlun;
    let res = await this.ativService
      .findByTurmAlunIdTrimestre(codTurmAlun)
      .toPromise();

    if (res && res.length > 0) {
      this.listAtiv = res;
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

  openAtivAvalDetailsPage(ativ: AtividadeAvaliativaDTO) {
    this.dataProvider.storage = { ativ };
    this.router.navigate(["ativ-aval-details"]);
  }
}
