import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { BoletimTrimestreDisciplinaPage } from "./boletim-trimestre-disciplina.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: BoletimTrimestreDisciplinaPage }])
  ],
  declarations: [BoletimTrimestreDisciplinaPage]
})
export class BoletimTrimestreDisciplinaPageModule {}
