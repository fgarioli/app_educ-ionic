import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { BoletimDetailsPage } from "./boletim-details.page";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: BoletimDetailsPage }])
  ],
  declarations: [BoletimDetailsPage]
})
export class BoletimDetailsPageModule {}
