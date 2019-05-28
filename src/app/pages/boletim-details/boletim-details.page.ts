import { BoletimDTO } from "../../models/boletim.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-boletim-details",
  templateUrl: "boletim-details.page.html",
  styleUrls: ["./boletim-details.page.scss"]
})
export class BoletimDetailsPage implements OnInit {
  boletim: BoletimDTO;

  constructor(private dataProvider: DataProvider) {
    this.boletim = this.dataProvider.storage.boletim;
  }

  async ngOnInit() {}
}
