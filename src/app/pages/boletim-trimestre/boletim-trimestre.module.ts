import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { BoletimTrimestrePage } from "./boletim-trimestre.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: BoletimTrimestrePage }])
  ],
  declarations: [BoletimTrimestrePage]
})
export class BoletimTrimestrePageModule {}
