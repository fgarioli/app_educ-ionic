import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { FrequenciaDetailsPage } from "./frequencia-details.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: FrequenciaDetailsPage }])
  ],
  declarations: [FrequenciaDetailsPage]
})
export class FrequenciaDetailsPageModule {}
