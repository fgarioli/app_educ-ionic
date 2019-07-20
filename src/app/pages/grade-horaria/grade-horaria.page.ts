import { GradeHorariaDTO } from "../../models/grade-horaria.dto";
import { Component, OnInit } from "@angular/core";
import { GradeHorariaServiceProvider } from "src/app/services/grade-horaria.service";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-grade-horaria",
  templateUrl: "grade-horaria.page.html",
  styleUrls: ["./grade-horaria.page.scss"]
})
export class GradeHorariaPage implements OnInit {
  grade: GradeHorariaDTO;
  diasSemana;
  codTurmAlun;

  constructor(
    private dataProvider: DataProvider,
    private router: Router,
    public gradeHorariaService: GradeHorariaServiceProvider,
    private alertController: AlertController,
    private loadindCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = await this.loadindCtrl.create({
      message: "Carregando..."
    });
    await loading.present();
    this.codTurmAlun = this.dataProvider.storage.codTurmAlun;
    let res = await this.gradeHorariaService
      .findByTurmAlun(this.codTurmAlun)
      .toPromise();
    await loading.dismiss();

    if (res.diasSemana.length > 0 && res.tempos.length > 0) {
      this.grade = res;
      this.diasSemana = res.diasSemana;
    } else {
      const alert = await this.alertController.create({
        header: "Nenhuma grade horária encontrada.",
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

  openGradeHorariaDetailsPage(dia) {
    let tempos = this.gradeHorariaService.findByDiaSemana(
      this.grade,
      dia.idDia
    );

    this.dataProvider.storage = {
      tempos: tempos,
      diaSemana: dia.dia
    };
    this.router.navigate(["grade-details"]);
  }
}
