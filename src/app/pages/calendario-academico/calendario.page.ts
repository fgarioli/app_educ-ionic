import { Component, OnInit } from "@angular/core";
import { CalendarComponentOptions, DayConfig } from "ion2-calendar";
import * as moment from "moment";
import { CalendarioServiceProvider } from "src/app/services/calendario.service";
import { CalendarioDTO } from "src/app/models/calendario.dto";
import { environment } from "src/environments/environment";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-calendario",
  templateUrl: "calendario.page.html",
  styleUrls: ["calendario.page.scss"]
})
export class CalendarioPage implements OnInit {
  optionsRange: CalendarComponentOptions;
  listCale: CalendarioDTO[];
  date: string;
  periodo: string;
  tipo: string;
  descricao: string;

  constructor(
    private caleService: CalendarioServiceProvider,
    private loadindCtrl: LoadingController
  ) {}

  async ngOnInit() {
    let loading = await this.loadindCtrl.create({
      message: "Carregando..."
    });
    await loading.present();
    moment.locale("pt-BR");

    this.listCale = await this.caleService
      .findCalendarioByAno(environment.ano)
      .toPromise();

    let _daysConfig: DayConfig[] = [];

    this.listCale.forEach(value => {
      _daysConfig.push({
        date: moment(value.dataCale).toDate(),
        cssClass: this.getColor(value)
      });
    });

    this.optionsRange = {
      pickMode: "single",
      showAdjacentMonthDay: false,
      weekdays: moment.weekdaysShort(),
      monthPickerFormat: moment.monthsShort(),
      from: moment(this.listCale[0].dataCale).toDate(),
      to: moment(this.listCale[this.listCale.length - 1].dataCale).toDate(),
      daysConfig: _daysConfig
    };
    await loading.dismiss();
  }

  onSelect($event) {
    let cale: CalendarioDTO = this.listCale.find(value =>
      moment(value.dataCale).isSame(moment($event.time))
    );

    if (cale) {
      this.periodo = cale.periodoCale ? `Período: ${cale.periodoCale}` : null;
      this.descricao = cale.descrCale;
      this.tipo = cale.tipoCale;
    }
  }

  getColor(cale: CalendarioDTO) {
    if (cale.idCale == "D") {
      return "dialetivo";
    } else if (cale.idCale == "I") {
      return "inicio";
    } else if (cale.idCale == "N") {
      return "feriadon";
    } else if (cale.idCale == "U") {
      return "pfacultativo";
    } else if (cale.idCale == "T") {
      return "fim";
    } else if (cale.idCale == "E") {
      return "recesso";
    } else if (cale.idCale == "P") {
      return "planejamento";
    } else if (cale.idCale == "R") {
      return "result-final";
    } else if (cale.idCale == "Z") {
      return "conselho-classe";
    } else if (cale.idCale == "X") {
      return "plantao-pedagogico";
    } else if (cale.idCale == "L") {
      return "recuperacao-final";
    }
  }
}
