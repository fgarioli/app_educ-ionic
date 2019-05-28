import { Component, OnInit } from "@angular/core";
import { CalendarComponentOptions, DayConfig } from "ion2-calendar";
import * as moment from "moment";
import { CalendarioServiceProvider } from "src/app/services/calendario.service";
import { CalendarioDTO } from "src/app/models/calendario.dto";
import { environment } from "src/environments/environment";

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

  constructor(private caleService: CalendarioServiceProvider) {}

  async ngOnInit() {
    moment.locale("pt-BR");

    this.listCale = await this.caleService
      .findCalendarioByAno(environment.ano)
      .toPromise();

    let _daysConfig: DayConfig[] = [];

    this.listCale.forEach(value => {
      _daysConfig.push({
        date: moment(value.dataCale).toDate(),
        cssClass: "feriado"
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
}
