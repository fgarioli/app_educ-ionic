import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { FrequenciaTrimestrePage } from "./frequencia-trimestre.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

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
