import Functions from "../../utils/functions.utils";
import { Component, OnInit } from "@angular/core";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { DataProvider } from "src/app/providers/data.provider";
import { Router } from "@angular/router";

@Component({
  selector: "app-ativ-aval",
  templateUrl: "ativ-aval.page.html",
  styleUrls: ["./ativ-aval.page.scss"]
})
export class AtivAvalPage implements OnInit {
  listAtiv: AtividadeAvaliativaDTO[];
  disc;
  private functions: Functions = new Functions();

  constructor(
    private dataProvider: DataProvider,
    private router: Router
  ) {}

  async ngOnInit() {
    this.listAtiv = this.dataProvider.storage.ativs;
    this.disc = this.dataProvider.storage.disc;
  }

  openAtivAvalDetailsPage(ativ: AtividadeAvaliativaDTO) {
    this.dataProvider.storage = { ativ };
    this.router.navigate(["ativ-aval-details"]);
  }
}
