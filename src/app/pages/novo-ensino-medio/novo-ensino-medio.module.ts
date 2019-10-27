import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { NovoEnsinoMedioPage } from "./novo-ensino-medio.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: NovoEnsinoMedioPage }])
  ],
  declarations: [NovoEnsinoMedioPage]
})
export class NovoEnsinoMedioPageModule {}
