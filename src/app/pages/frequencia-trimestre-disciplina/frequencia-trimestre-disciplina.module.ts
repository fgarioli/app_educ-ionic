import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { FrequenciaTrimestreDisciplinaPage } from "./frequencia-trimestre-disciplina.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: "", component: FrequenciaTrimestreDisciplinaPage }
    ])
  ],
  declarations: [FrequenciaTrimestreDisciplinaPage]
})
export class FrequenciaTrimestreDisciplinaPageModule {}
