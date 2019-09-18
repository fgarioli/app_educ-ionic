import { Component, OnInit } from "@angular/core";
import { AuthServiceProvider } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sobre",
  templateUrl: "sobre.page.html",
  styleUrls: ["./sobre.page.scss"]
})
export class SobrePage implements OnInit {
  constructor(
    public authService: AuthServiceProvider,
    private router: Router
  ) {}

  async ngOnInit() {}

  async voltar() {
    let user_data = await this.authService.getUserData();

    if (user_data.role == "ROLE_ALUN") {
      this.router.navigate(["aluno"]);
    } else {
      this.router.navigate(["alunos"]);
    }
  }
}
