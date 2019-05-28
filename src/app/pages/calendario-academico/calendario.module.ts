import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { CalendarioPage } from "./calendario.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "ion2-calendar";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild([{ path: "", component: CalendarioPage }])
  ],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
