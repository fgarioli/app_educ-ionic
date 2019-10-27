import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { DisciplinaDTO } from "src/app/models/disciplina.dto";
import { environment } from "src/environments/environment";
import { LoadingController, AlertController } from "@ionic/angular";
import { AtivServiceProvider } from "src/app/services/ativ.service";

@Component({
  selector: "app-ativ-aval-trimestre-disciplina",
  templateUrl: "ativ-aval-trimestre-disciplina.page.html",
  styleUrls: ["./ativ-aval-trimestre-disciplina.page.scss"]
})
export class AtivAvalTrimestreDisciplinaPage implements OnInit {
  anoLetivo = environment.ano;
  listDisc: DisciplinaDTO[] = [];
  trimestre: number;
  idTurmAlun: number;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private ativService: AtivServiceProvider
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

      let res = await this.ativService
        .getListDisciplina(this.idTurmAlun, this.trimestre)
        .toPromise();
      await loading.dismiss();
      if (res && res.length > 0) {
        this.listDisc = res;
      } else {
        const alert = await this.alertController.create({
          header: "Nenhuma atividade lançada em nenhuma disciplina.",
          message:
            "Por favor entre em contato com a EMEB para mais informações.",
          buttons: [
            {
              text: "Ok",
              handler: () => {
                this.router.navigate(["ativ-aval-trimestre"]);
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
    this.router.navigate(["ativ-aval-details"]);
  }
}
