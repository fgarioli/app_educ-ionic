import { NgModule } from "@angular/core";
import { FrequenciaPage } from "./frequencia.page";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: FrequenciaPage }])
  ],
  declarations: [FrequenciaPage]
})
export class FrequenciaPageModule {}
