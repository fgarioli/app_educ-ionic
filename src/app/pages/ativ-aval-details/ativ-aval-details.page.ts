import Functions from "../../utils/functions.utils";
import { AtividadeAvaliativaDTO } from "../../models/ativ.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-ativ-aval-details",
  templateUrl: "ativ-aval-details.page.html",
  styleUrls: ["./ativ-aval-details.page.scss"]
})
export class AtivAvalDetailsPage implements OnInit {
  ativ: AtividadeAvaliativaDTO;
  functions: Functions = new Functions();

  constructor(private dataProvider: DataProvider) {
    this.ativ = this.dataProvider.storage.ativ;
  }

  async ngOnInit() {}
}
