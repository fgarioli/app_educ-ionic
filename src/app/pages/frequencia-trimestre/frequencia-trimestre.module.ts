import { NgModule } from "@angular/core";
import { FrequenciaTrimestrePage } from "./frequencia-trimestre.page";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: FrequenciaTrimestrePage }])
  ],
  declarations: [FrequenciaTrimestrePage]
})
export class FrequenciaTrimestrePageModule {}
