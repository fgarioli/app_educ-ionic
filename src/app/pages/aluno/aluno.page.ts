import { Component, OnInit, Input } from "@angular/core";

// import { MensagensPage } from "../mensagens/mensagens.page";
// import { EmebPage } from "../emeb/emeb.page";
// import { FrequenciaPage } from "../frequencia/frequencia";
// import { BoletimPage } from "../boletim/boletim.page";
import { TurmAlunDTO } from "../../models/turmalun.dto";
import { ActivatedRoute, Router } from "@angular/router";
import { TurmalunServiceProvider } from "src/app/services/turmalun.service";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-aluno",
  templateUrl: "aluno.page.html",
  styleUrls: ["./aluno.page.scss"]
})
export class AlunoPage implements OnInit {
  aluno: TurmAlunDTO;

  constructor(
    private data: DataProvider,
    private router: Router,
    private turmAlunService: TurmalunServiceProvider
  ) {}

  async ngOnInit() {
    this.aluno = this.data.storage;

    // if (this.id) {
    //   this.id = this.activateroute.snapshot.paramMap.get("id");
    //   console.log("ID: ", this.id);
    //   this.aluno = await this.turmAlunService
    //     .findByAluno(this.id, "2018")
    //     .toPromise();
    // }

    console.log(this.aluno);
  }

  openGradeHorariaPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["grade-horaria"]);
  }

  openAtivAvalPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["ativ-aval"]);
  }

  openBoletimPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["boletim"]);
  }

  openFrequenciaPage(codTurmAlun) {
    this.data.storage = { codTurmAlun };
    this.router.navigate(["frequencia"]);
  }

  // openEmebPage(aluno) {
  //   this.router.navigate(["/emeb", { aluno: aluno }]);
  // }

  verificaBNC(): boolean {
    if (
      this.aluno.turma.nomeTurm.includes("3") ||
      this.aluno.turma.nomeTurm.includes("4") ||
      this.aluno.turma.nomeTurm.includes("5")
    ) {
      return false;
    }
    return true;
  }
}
