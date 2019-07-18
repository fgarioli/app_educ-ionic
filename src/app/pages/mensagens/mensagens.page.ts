import { MensagemDTO } from "../../models/mensagem.dto";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { GradeHorariaServiceProvider } from "src/app/services/grade-horaria.service";
import { MensagemServiceProvider } from "src/app/services/mensagem.service";
import { AuthServiceProvider } from "src/app/services/auth.service";

@Component({
  selector: "app-mensagens",
  templateUrl: "mensagens.page.html",
  styleUrls: ["./mensagens.page.scss"]
})
export class MensagensPage implements OnInit {
  listMsg: MensagemDTO[];

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    public gradeHorariaService: GradeHorariaServiceProvider,
    private msgService: MensagemServiceProvider,
    private authService: AuthServiceProvider,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    try {
      let user_data = await this.authService.getUserData();
      let res = await this.msgService
        .findMensagemByUsuario(user_data.user.codUsuario)
        .toPromise();

      if (res && res.length > 0) {
        this.listMsg = res;
      } else {
        const alert = await this.alertController.create({
          header: "Não há mensagens.",
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

  openMessage(msg: MensagemDTO) {
    this.dataProvider.storage = {
      msg
    };
    this.router.navigate(["mensagens-details"]);
  }
}
