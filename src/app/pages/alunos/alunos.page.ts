import { Component, OnInit } from "@angular/core";
import { TurmAlunDTO } from "../../models/turmalun.dto";
import { TurmalunServiceProvider } from "../../services/turmalun.service";
import { Router } from "@angular/router";
import { DataProvider } from "src/app/providers/data.provider";
import { environment } from "src/environments/environment";
import { AuthServiceProvider } from "src/app/services/auth.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-alunos",
  templateUrl: "alunos.page.html",
  styleUrls: ["alunos.page.scss"]
})
export class AlunosPage implements OnInit {
  items: TurmAlunDTO[] = [];
  id: String;
  aluno: TurmAlunDTO;

  constructor(
    private router: Router,
    private data: DataProvider,
    private turmAlunService: TurmalunServiceProvider,
    private authService: AuthServiceProvider,
    private loadindCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = null;

    try {
      loading = await this.loadindCtrl.create({
        message: "Carregando..."
      });
      await loading.present();
      let user_data = await this.authService.getUserData();
      this.id = user_data.user.codUsuario;
      // this.id = this.activatedRoute.snapshot.paramMap.get("id");

      this.items = await this.turmAlunService
        .findByResponsavel(this.id, environment.ano)
        .toPromise();
      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      throw error;
    }
  }

  navigate(aluno: TurmAlunDTO) {
    this.data.storage = aluno;
    this.router.navigate(["aluno"]);
  }
}
