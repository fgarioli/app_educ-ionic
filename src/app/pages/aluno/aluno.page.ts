import { Component, OnInit } from "@angular/core";

// import { MensagensPage } from "../mensagens/mensagens.page";
// import { EmebPage } from "../emeb/emeb.page";
// import { FrequenciaPage } from "../frequencia/frequencia";
// import { BoletimPage } from "../boletim/boletim.page";
import { TurmAlunDTO } from "../../models/turmalun.dto";
import { Router } from "@angular/router";
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
    private router: Router
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
    return true;
  }
}
