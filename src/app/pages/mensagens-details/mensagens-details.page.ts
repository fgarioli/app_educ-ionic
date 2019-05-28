import { MensagemDTO } from "../../models/mensagem.dto";
import { Component, OnInit } from "@angular/core";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-mensagens-details",
  templateUrl: "mensagens-details.page.html",
  styleUrls: ["./mensagens-details.page.scss"]
})
export class MensagensDetailsPage implements OnInit {
  msg: MensagemDTO;

  constructor(private dataProvider: DataProvider) {}

  async ngOnInit() {
    this.msg = this.dataProvider.storage.msg;
  }
}
