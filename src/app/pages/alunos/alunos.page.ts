import { Component, OnInit } from "@angular/core";
import { TurmAlunDTO } from "../../models/turmalun.dto";
import { TurmalunServiceProvider } from "../../services/turmalun.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DataProvider } from "src/app/providers/data.provider";
import { environment } from "src/environments/environment";
import { AuthServiceProvider } from 'src/app/services/auth.service';

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
    private activatedRoute: ActivatedRoute,
    private turmAlunService: TurmalunServiceProvider,
    private authService: AuthServiceProvider
  ) {}

  async ngOnInit() {
    this.id = this.authService.getUserData().codUsuario;
    // this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.items = await this.turmAlunService
      .findByResponsavel(this.id, environment.ano)
      .toPromise();
  }

  navigate(aluno: TurmAlunDTO) {
    this.data.storage = aluno;
    this.router.navigate(["aluno"]);
  }
}
