import { NgModule } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { CalendarioPage } from "./calendario.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "ion2-calendar";
import { AuthServiceProvider } from "src/app/services/auth.service";

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
