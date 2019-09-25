import { Component, OnInit } from "@angular/core";

import { TurmAlunDTO } from "../../models/turmalun.dto";
import { Router } from "@angular/router";
import { DataProvider } from "src/app/providers/data.provider";
import { AuthServiceProvider } from "src/app/services/auth.service";
import { LoadingController } from "@ionic/angular";
import { TurmalunServiceProvider } from "src/app/services/turmalun.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-aluno",
  templateUrl: "aluno.page.html",
  styleUrls: ["./aluno.page.scss"]
})
export class AlunoPage implements OnInit {
  aluno = {
    nomeAluno: "",
    codTurmAlun: null,
    turma: { nomeTurm: "", emeb: { nomeEmeb: "" } }
  };
  menu: Promise<boolean>;

  constructor(
    private data: DataProvider,
    private router: Router,
    private authService: AuthServiceProvider,
    private loadindCtrl: LoadingController,
    private turmAlunService: TurmalunServiceProvider
  ) {}

  async ngOnInit() {
    let loading = null;
    try {
      let user_data = await this.authService.getUserData();

      if (user_data.role == "ROLE_ALUN") {
        this.menu = Promise.resolve(true);
        let loading = await this.loadindCtrl.create({
          message: "Carregando..."
        });
        await loading.present();

        this.aluno = await this.turmAlunService
          .findByAluno(user_data.user.codUsuario, environment.ano)
          .toPromise();

        await loading.dismiss();
      } else {
        this.menu = Promise.resolve(false);
        this.aluno = this.data.storage;
      }
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }

  openGradeHorariaPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["grade-horaria"]);
  }

  openAtivAvalPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["ativ-aval-disc"]);
  }

  openBoletimPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["boletim"]);
  }

  openFrequenciaPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["frequencia-trimestre"]);
  }

  // openEmebPage(aluno) {
  //   this.router.navigate(["/emeb", { aluno: aluno }]);
  // }

  verificaBNC(): boolean {
    return true;
  }
}
